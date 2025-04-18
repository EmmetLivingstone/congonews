const axios = require('axios');
const cheerio = require('cheerio');
const Parser = require('rss-parser');

const parser = new Parser();

// Simple in-memory cache
let newsCache = {
  data: null,
  timestamp: null
};

exports.handler = async function(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
  
  // Check if we have valid cached data (less than 30 minutes old)
  const now = new Date();
  if (newsCache.data && newsCache.timestamp && 
      (now - newsCache.timestamp) < 30 * 60 * 1000) {
    console.log('Returning cached news data');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(newsCache.data)
    };
  }
  
  try {
    console.log('Fetching fresh news from sources...');
    
    // Fetch from all sources with independent error handling
    const results = await Promise.allSettled([
      fetchRadioOkapi(),
      fetchActualiteCD(),
      fetchRFI(),
      fetchMinesCD()
    ]);
    
    // Extract successful results
    let allNews = [];
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        allNews = [...allNews, ...result.value];
      } else {
        console.error('Source fetch failed:', result.reason);
      }
    });
    
    // Group news by date
    const newsByDate = {};
    allNews.forEach(article => {
      try {
        // Convert to date object
        const articleDate = new Date(article.timestamp || article.date);
        // Format as YYYY-MM-DD
        const dateStr = articleDate.toISOString().split('T')[0];
        
        if (!newsByDate[dateStr]) {
          newsByDate[dateStr] = [];
        }
        newsByDate[dateStr].push(article);
      } catch (e) {
        console.error('Error processing article date:', e);
        // If date processing fails, use current date as fallback
        const todayStr = now.toISOString().split('T')[0];
        if (!newsByDate[todayStr]) {
          newsByDate[todayStr] = [];
        }
        newsByDate[todayStr].push(article);
      }
    });
    
    // Sort articles within each date group by timestamp (newest first)
    Object.keys(newsByDate).forEach(date => {
      newsByDate[date].sort((a, b) => {
        const dateA = new Date(a.timestamp || a.date);
        const dateB = new Date(b.timestamp || b.date);
        return dateB - dateA;
      });
    });
    
    // Latest articles sorted by timestamp
    const latestNews = [...allNews].sort((a, b) => {
      const dateA = new Date(a.timestamp || a.date);
      const dateB = new Date(b.timestamp || b.date);
      return dateB - dateA;
    });
    
    // Update cache
    newsCache = {
      data: { 
        byDate: newsByDate,
        latest: latestNews,
        fetchTime: now.toISOString()
      },
      timestamp: now
    };
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(newsCache.data)
    };
  } catch (error) {
    console.error('Main error in news fetch:', error);
    
    // If we have cached data, return it even if expired
    if (newsCache.data) {
      console.log('Returning stale cached data due to error');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ...newsCache.data,
          fromCache: true,
          cacheAge: Math.round((now - newsCache.timestamp) / (60 * 1000)) + ' minutes'
        })
      };
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch news', 
        message: error.message 
      })
    };
  }
};

// Function to fetch Radio Okapi news (via RSS)
async function fetchRadioOkapi() {
  try {
    console.log('Fetching Radio Okapi news...');
    const feed = await parser.parseURL('https://www.radiookapi.net/rss.xml');
    
    const articles = [];
    let index = 1;
    
    for (const item of feed.items.slice(0, 15)) {
      try {
        // Determine category from URL or title
        const category = determineCategory(item.title, item.link);
        
        // Only include specific categories
        if (['politique', 'securite', 'societe'].includes(category)) {
          const pubDate = new Date(item.pubDate);
          
          const article = {
            id: `radio-okapi-${index++}`,
            title: item.title,
            source: 'Radio Okapi',
            date: pubDate.toLocaleDateString('en-US', { 
              month: 'long', day: 'numeric', year: 'numeric' 
            }),
            timestamp: pubDate.toISOString(),
            category: category,
            content: `<p>${item.contentSnippet ? item.contentSnippet.split('\n').join('</p><p>') : ''}</p>`,
            link: item.link
          };
          
          articles.push(article);
        }
      } catch (itemError) {
        console.error('Error processing Radio Okapi item:', itemError);
        // Continue with next item
      }
    }
    
    console.log(`Found ${articles.length} articles from Radio Okapi`);
    return articles;
  } catch (error) {
    console.error('Error fetching Radio Okapi news:', error);
    return [];
  }
}

// Function to fetch Actualite.cd news
async function fetchActualiteCD() {
  try {
    console.log('Fetching Actualite.cd news...');
    let articles = [];
    let index = 1;
    
    // Fetch politique articles
    try {
      const politiqueResponse = await axios.get('https://actualite.cd/category/actualite/politique', {
        timeout: 10000 // 10 second timeout
      });
      const $politique = cheerio.load(politiqueResponse.data);
      
      $politique('article.node--type-article, .article, .view-content article').slice(0, 5).each((i, el) => {
        try {
          // Try multiple selectors for flexibility
          const title = $politique(el).find('h2 a, .article__title, .title a').first().text().trim();
          const link = $politique(el).find('h2 a, .article__title a, .title a').first().attr('href');
          const dateText = $politique(el).find('.date, .submitted, time').first().text().trim();
          const snippet = $politique(el).find('.article__summary, .field--name-body, .content').first().text().trim();
          
          // Try to parse date, fallback to current date
          let pubDate = new Date();
          try {
            if (dateText) {
              pubDate = new Date(dateText);
              // If invalid date, use current
              if (isNaN(pubDate.getTime())) {
                pubDate = new Date();
              }
            }
          } catch (e) {
            console.log('Could not parse date, using current:', dateText);
          }
          
          if (title) {
            const article = {
              id: `actualite-cd-${index++}`,
              title: title,
              source: 'Actualite.cd',
              date: pubDate.toLocaleDateString('en-US', { 
                month: 'long', day: 'numeric', year: 'numeric' 
              }),
              timestamp: pubDate.toISOString(),
              category: 'politique',
              content: `<p>${snippet}</p>`,
              link: link ? (link.startsWith('http') ? link : `https://actualite.cd${link}`) : null
            };
            
            articles.push(article);
          }
        } catch (elemError) {
          console.error('Error processing Actualite.cd element:', elemError);
        }
      });
    } catch (error) {
      console.error('Error fetching Actualite.cd politics news:', error);
    }
    
    // Similarly try for security articles
    try {
      const securiteResponse = await axios.get('https://actualite.cd/category/actualite/securite', {
        timeout: 10000
      });
      const $securite = cheerio.load(securiteResponse.data);
      
      $securite('article.node--type-article, .article, .view-content article').slice(0, 5).each((i, el) => {
        try {
          const title = $securite(el).find('h2 a, .article__title, .title a').first().text().trim();
          const link = $securite(el).find('h2 a, .article__title a, .title a').first().attr('href');
          const dateText = $securite(el).find('.date, .submitted, time').first().text().trim();
          const snippet = $securite(el).find('.article__summary, .field--name-body, .content').first().text().trim();
          
          let pubDate = new Date();
          try {
            if (dateText) {
              pubDate = new Date(dateText);
              if (isNaN(pubDate.getTime())) {
                pubDate = new Date();
              }
            }
          } catch (e) {
            console.log('Could not parse date, using current:', dateText);
          }
          
          if (title) {
            const article = {
              id: `actualite-cd-${index++}`,
              title: title,
              source: 'Actualite.cd',
              date: pubDate.toLocaleDateString('en-US', { 
                month: 'long', day: 'numeric', year: 'numeric' 
              }),
              timestamp: pubDate.toISOString(),
              category: 'securite',
              content: `<p>${snippet}</p>`,
              link: link ? (link.startsWith('http') ? link : `https://actualite.cd${link}`) : null
            };
            
            articles.push(article);
          }
        } catch (elemError) {
          console.error('Error processing Actualite.cd security element:', elemError);
        }
      });
    } catch (error) {
      console.error('Error fetching Actualite.cd security news:', error);
    }
    
    console.log(`Found ${articles.length} articles from Actualite.cd`);
    return articles;
  } catch (error) {
    console.error('Error fetching Actualite.cd news:', error);
    return [];
  }
}

// Function to fetch RFI news
async function fetchRFI() {
  try {
    console.log('Fetching RFI news...');
    const articles = [];
    let index = 1;
    
    // Fetch DRC news
    try {
      const rdcFeed = await parser.parseURL('https://www.rfi.fr/fr/tag/rdc/feed/');
      
      for (const item of rdcFeed.items.slice(0, 5)) {
        try {
          const category = determineCategory(item.title, item.link);
          const pubDate = new Date(item.pubDate);
          
          const article = {
            id: `rfi-${index++}`,
            title: item.title,
            source: 'Radio France Internationale',
            date: pubDate.toLocaleDateString('en-US', { 
              month: 'long', day: 'numeric', year: 'numeric' 
            }),
            timestamp: pubDate.toISOString(),
            category: category,
            content: `<p>${item.contentSnippet ? item.contentSnippet.split('\n').join('</p><p>') : ''}</p>`,
            link: item.link
          };
          
          articles.push(article);
        } catch (itemError) {
          console.error('Error processing RFI DRC item:', itemError);
        }
      }
    } catch (error) {
      console.error('Error fetching RFI DRC news:', error);
    }
    
    // Fetch Rwanda news
    try {
      const rwandaFeed = await parser.parseURL('https://www.rfi.fr/fr/tag/rwanda/feed/');
      
      for (const item of rwandaFeed.items.slice(0, 3)) {
        try {
          const category = determineCategory(item.title, item.link);
          const pubDate = new Date(item.pubDate);
          
          const article = {
            id: `rfi-${index++}`,
            title: item.title,
            source: 'Radio France Internationale',
            date: pubDate.toLocaleDateString('en-US', { 
              month: 'long', day: 'numeric', year: 'numeric' 
            }),
            timestamp: pubDate.toISOString(),
            category: category,
            content: `<p>${item.contentSnippet ? item.contentSnippet.split('\n').join('</p><p>') : ''}</p>`,
            link: item.link
          };
          
          articles.push(article);
        } catch (itemError) {
          console.error('Error processing RFI Rwanda item:', itemError);
        }
      }
    } catch (error) {
      console.error('Error fetching RFI Rwanda news:', error);
    }
    
    // Fetch Burundi news
    try {
      const burundiFeed = await parser.parseURL('https://www.rfi.fr/fr/tag/burundi/feed/');
      
      for (const item of burundiFeed.items.slice(0, 3)) {
        try {
          const category = determineCategory(item.title, item.link);
          const pubDate = new Date(item.pubDate);
          
          const article = {
            id: `rfi-${index++}`,
            title: item.title,
            source: 'Radio France Internationale',
            date: pubDate.toLocaleDateString('en-US', { 
              month: 'long', day: 'numeric', year: 'numeric' 
            }),
            timestamp: pubDate.toISOString(),
            category: category,
            content: `<p>${item.contentSnippet ? item.contentSnippet.split('\n').join('</p><p>') : ''}</p>`,
            link: item.link
          };
          
          articles.push(article);
        } catch (itemError) {
          console.error('Error processing RFI Burundi item:', itemError);
        }
      }
    } catch (error) {
      console.error('Error fetching RFI Burundi news:', error);
    }
    
    console.log(`Found ${articles.length} articles from RFI`);
    return articles;
  } catch (error) {
    console.error('Error fetching RFI news:', error);
    return [];
  }
}

// Function to fetch Mines.cd news
async function fetchMinesCD() {
  try {
    console.log('Fetching Mines.cd news...');
    const response = await axios.get('https://mines.cd/', {
      timeout: 10000
    });
    
    const articles = [];
    let index = 1;
    
    // Process articles
    const $ = cheerio.load(response.data);
    
    $('.jeg_post, article, .post').slice(0, 6).each((i, el) => {
      try {
        const title = $(el).find('.jeg_post_title, .entry-title, h2 a').first().text().trim();
        const link = $(el).find('.jeg_post_title a, .entry-title a, h2 a').first().attr('href');
        const dateText = $(el).find('.jeg_meta_date, .published, .date').first().text().trim();
        const snippet = $(el).find('.jeg_post_excerpt, .entry-excerpt, .excerpt').first().text().trim();
        
        // Try to parse date, fallback to current date
        let pubDate = new Date();
        try {
          if (dateText) {
            pubDate = new Date(dateText);
            // If invalid date, use current
            if (isNaN(pubDate.getTime())) {
              pubDate = new Date();
            }
          }
        } catch (e) {
          console.log('Could not parse date, using current:', dateText);
        }
        
        if (title) {
          const article = {
            id: `mines-cd-${index++}`,
            title: title,
            source: 'Mines.cd',
            date: pubDate.toLocaleDateString('en-US', { 
              month: 'long', day: 'numeric', year: 'numeric' 
            }),
            timestamp: pubDate.toISOString(),
            category: 'economie',
            content: `<p>${snippet}</p>`,
            link: link
          };
          
          articles.push(article);
        }
      } catch (elemError) {
        console.error('Error processing Mines.cd element:', elemError);
      }
    });
    
    console.log(`Found ${articles.length} articles from Mines.cd`);
    return articles;
  } catch (error) {
    console.error('Error fetching Mines.cd news:', error);
    return [];
  }
}

// Helper function to determine category from title or URL
function determineCategory(title, url) {
  title = (title || '').toLowerCase();
  url = (url || '').toLowerCase();
  
  // Check URL first
  if (url.includes('politique') || url.includes('election')) {
    return 'politique';
  } else if (url.includes('securite') || url.includes('conflit') || url.includes('armee')) {
    return 'securite';
  } else if (url.includes('economie') || url.includes('finance') || url.includes('mines')) {
    return 'economie';
  } else if (url.includes('societe') || url.includes('sante') || url.includes('education')) {
    return 'societe';
  } else if (url.includes('environnement') || url.includes('climat')) {
    return 'environnement';
  }
  
  // Then check title
  if (title.includes('president') || title.includes('ministre') || title.includes('gouvernement') || 
      title.includes('election') || title.includes('parlement') || title.includes('politique')) {
    return 'politique';
  } else if (title.includes('armee') || title.includes('conflit') || title.includes('securite') || 
             title.includes('attaque') || title.includes('violence') || title.includes('militaire')) {
    return 'securite';
  } else if (title.includes('economie') || title.includes('finance') || title.includes('mine') || 
             title.includes('cobalt') || title.includes('cuivre') || title.includes('dollar')) {
    return 'economie';
  } else if (title.includes('hopital') || title.includes('ecole') || title.includes('education') || 
             title.includes('sante') || title.includes('social')) {
    return 'societe';
  } else if (title.includes('environnement') || title.includes('climat') || 
             title.includes('parc') || title.includes('foret')) {
    return 'environnement';
  }
  
  // Default category
  return 'politique';
}
