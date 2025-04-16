const axios = require('axios');
const cheerio = require('cheerio');
const Parser = require('rss-parser');

const parser = new Parser();

// CORS headers for cross-origin requests
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
};

exports.handler = async function(event) {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    console.log('Fetching news from sources...');
    
    // Fetch from all sources in parallel
    const [radioOkapiNews, actualiteCDNews, rfiNews, minesCDNews] = await Promise.all([
      fetchRadioOkapi(),
      fetchActualiteCD(),
      fetchRFI(),
      fetchMinesCD()
    ]);
    
    // Combine all news
    const allNews = [
      ...radioOkapiNews,
      ...actualiteCDNews,
      ...rfiNews,
      ...minesCDNews
    ];
    
    // Sort by most recent first (assuming articles have a timestamp)
    allNews.sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date));
    
    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ news: allNews })
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch news' })
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
    
    for (const item of feed.items.slice(0, 10)) {
      // Determine category from URL or title
      const category = determineCategory(item.title, item.link);
      
      // Only include specific categories
      if (['politique', 'securite', 'societe'].includes(category)) {
        const article = {
          id: `radio-okapi-${index++}`,
          title: item.title,
          source: 'Radio Okapi',
          date: new Date(item.pubDate).toLocaleDateString('en-US', { 
            month: 'long', day: 'numeric', year: 'numeric' 
          }),
          timestamp: item.pubDate,
          category: category,
          content: `<p>${item.contentSnippet ? item.contentSnippet.split('\n').join('</p><p>') : ''}</p>`,
          link: item.link
        };
        
        articles.push(article);
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
      const politiqueResponse = await axios.get('https://actualite.cd/category/actualite/politique');
      const $politique = cheerio.load(politiqueResponse.data);
      
      $politique('article.node--type-article').slice(0, 5).each((i, el) => {
        const title = $politique(el).find('h2 a').text().trim();
        const link = $politique(el).find('h2 a').attr('href');
        const snippet = $politique(el).find('.article__summary').text().trim();
        
        const article = {
          id: `actualite-cd-${index++}`,
          title: title,
          source: 'Actualite.cd',
          date: new Date().toLocaleDateString('en-US', { 
            month: 'long', day: 'numeric', year: 'numeric' 
          }),
          timestamp: new Date().toISOString(),
          category: 'politique',
          content: `<p>${snippet}</p>`,
          link: link ? (link.startsWith('http') ? link : `https://actualite.cd${link}`) : null
        };
        
        articles.push(article);
      });
    } catch (error) {
      console.error('Error fetching Actualite.cd politics news:', error);
    }
    
    // Fetch security articles
    try {
      const securiteResponse = await axios.get('https://actualite.cd/category/actualite/securite');
      const $securite = cheerio.load(securiteResponse.data);
      
      $securite('article.node--type-article').slice(0, 5).each((i, el) => {
        const title = $securite(el).find('h2 a').text().trim();
        const link = $securite(el).find('h2 a').attr('href');
        const snippet = $securite(el).find('.article__summary').text().trim();
        
        const article = {
          id: `actualite-cd-${index++}`,
          title: title,
          source: 'Actualite.cd',
          date: new Date().toLocaleDateString('en-US', { 
            month: 'long', day: 'numeric', year: 'numeric' 
          }),
          timestamp: new Date().toISOString(),
          category: 'securite',
          content: `<p>${snippet}</p>`,
          link: link ? (link.startsWith('http') ? link : `https://actualite.cd${link}`) : null
        };
        
        articles.push(article);
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
      
      for (const item of rdcFeed.items.slice(0, 4)) {
        const category = determineCategory(item.title, item.link);
        
        const article = {
          id: `rfi-${index++}`,
          title: item.title,
          source: 'Radio France Internationale',
          date: new Date(item.pubDate).toLocaleDateString('en-US', { 
            month: 'long', day: 'numeric', year: 'numeric' 
          }),
          timestamp: item.pubDate,
          category: category,
          content: `<p>${item.contentSnippet ? item.contentSnippet.split('\n').join('</p><p>') : ''}</p>`,
          link: item.link
        };
        
        articles.push(article);
      }
    } catch (error) {
      console.error('Error fetching RFI DRC news:', error);
    }
    
    // Fetch Rwanda news
    try {
      const rwandaFeed = await parser.parseURL('https://www.rfi.fr/fr/tag/rwanda/feed/');
      
      for (const item of rwandaFeed.items.slice(0, 2)) {
        const category = determineCategory(item.title, item.link);
        
        const article = {
          id: `rfi-${index++}`,
          title: item.title,
          source: 'Radio France Internationale',
          date: new Date(item.pubDate).toLocaleDateString('en-US', { 
            month: 'long', day: 'numeric', year: 'numeric' 
          }),
          timestamp: item.pubDate,
          category: category,
          content: `<p>${item.contentSnippet ? item.contentSnippet.split('\n').join('</p><p>') : ''}</p>`,
          link: item.link
        };
        
        articles.push(article);
      }
    } catch (error) {
      console.error('Error fetching RFI Rwanda news:', error);
    }
    
    // Fetch Burundi news
    try {
      const burundiFeed = await parser.parseURL('https://www.rfi.fr/fr/tag/burundi/feed/');
      
      for (const item of burundiFeed.items.slice(0, 2)) {
        const category = determineCategory(item.title, item.link);
        
        const article = {
          id: `rfi-${index++}`,
          title: item.title,
          source: 'Radio France Internationale',
          date: new Date(item.pubDate).toLocaleDateString('en-US', { 
            month: 'long', day: 'numeric', year: 'numeric' 
          }),
          timestamp: item.pubDate,
          category: category,
          content: `<p>${item.contentSnippet ? item.contentSnippet.split('\n').join('</p><p>') : ''}</p>`,
          link: item.link
        };
        
        articles.push(article);
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
    const response = await axios.get('https://mines.cd/');
    
    const articles = [];
    let index = 1;
    
    // Process articles
    const $ = cheerio.load(response.data);
    
    $('.jeg_post').slice(0, 6).each((i, el) => {
      const title = $(el).find('.jeg_post_title').text().trim();
      const link = $(el).find('a').attr('href');
      const snippet = $(el).find('.jeg_post_excerpt').text().trim();
      
      const article = {
        id: `mines-cd-${index++}`,
        title: title,
        source: 'Mines.cd',
        date: new Date().toLocaleDateString('en-US', { 
          month: 'long', day: 'numeric', year: 'numeric' 
        }),
        timestamp: new Date().toISOString(),
        category: 'economie',
        content: `<p>${snippet}</p>`,
        link: link
      };
      
      articles.push(article);
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
  title = title ? title.toLowerCase() : '';
  url = url ? url.toLowerCase() : '';
  
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
