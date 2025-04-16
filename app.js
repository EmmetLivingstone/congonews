// Global variables
let currentFilter = {
    category: 'all',
    source: 'all',
    search: ''
};
let newsData = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    document.getElementById('category-filter').addEventListener('change', handleFilterChange);
    document.getElementById('source-filter').addEventListener('change', handleFilterChange);
    document.getElementById('search-input').addEventListener('input', handleFilterChange);
    document.getElementById('refresh-button').addEventListener('click', fetchLatestNews);
    
    // Initial load
    fetchLatestNews();
});

// Fetch latest news from the API
async function fetchLatestNews() {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '<div class="loading">Fetching latest news...</div>';
    
    document.getElementById('refresh-button').disabled = true;
    document.getElementById('refresh-button').textContent = 'Refreshing...';
    
    try {
        const response = await fetch('/api/get-news');
        
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        newsData = data.news;
        
        // Update last refreshed time
        const now = new Date();
        document.getElementById('last-refreshed').textContent = now.toLocaleString();
        
        // Apply current filters and display
        const filteredNews = filterArticles(newsData);
        displayNewsFeed(filteredNews);
    } catch (error) {
        console.error('Error:', error);
        sidebar.innerHTML = `<div class="error">Failed to fetch latest news. Please try again later.</div>`;
    } finally {
        document.getElementById('refresh-button').disabled = false;
        document.getElementById('refresh-button').textContent = 'Refresh News';
    }
}

// Filter news based on current filters
function filterArticles(articles) {
    return articles.filter(article => {
        // Filter by category
        if (currentFilter.category !== 'all' && article.category !== currentFilter.category) {
            return false;
        }
        
        // Filter by source
        if (currentFilter.source !== 'all' && article.source !== currentFilter.source) {
            return false;
        }
        
        // Filter by search term
        if (currentFilter.search && !article.title.toLowerCase().includes(currentFilter.search.toLowerCase())) {
            return false;
        }
        
        return true;
    });
}

// Event handler for filter changes
function handleFilterChange() {
    currentFilter = {
        category: document.getElementById('category-filter').value,
        source: document.getElementById('source-filter').value,
        search: document.getElementById('search-input').value
    };
    
    const filteredNews = filterArticles(newsData);
    displayNewsFeed(filteredNews);
}

// Display news in the sidebar
function displayNewsFeed(articles) {
    const sidebar = document.getElementById('sidebar');
    
    // If no articles match the filters
    if (articles.length === 0) {
        sidebar.innerHTML = '<div class="no-results">No articles match your filters. Try changing your search criteria.</div>';
        
        // Add Twitter feed back
        addTwitterFeed(sidebar);
        return;
    }
    
    // Group articles by source
    const sourceGroups = {};
    articles.forEach(article => {
        if (!sourceGroups[article.source]) {
            sourceGroups[article.source] = [];
        }
        sourceGroups[article.source].push(article);
    });
    
    // Build the sidebar HTML
    let sidebarHTML = '';
    
    for (const source in sourceGroups) {
        const articlesForSource = sourceGroups[source];
        
        sidebarHTML += `
        <div class="source" onclick="toggleSource(this)">
            <div class="source-header">
                <span>${source}</span>
                <div style="display: flex; align-items: center;">
                    <span class="source-badge">${articlesForSource.length}</span>
                    <span class="caret" style="margin-left: 10px;">▶</span>
                </div>
            </div>
            <div class="articles">
        `;
        
        articlesForSource.forEach(article => {
            sidebarHTML += `
                <div class="article" onclick="loadArticle('${article.id}')">
                    <div class="article-title">${article.title}</div>
                    <div>
                        <span class="article-category">${article.category}</span>
                        <span class="article-date">${article.date}</span>
                    </div>
                </div>
            `;
        });
        
        sidebarHTML += `
            </div>
        </div>
        `;
    }
    
    sidebar.innerHTML = sidebarHTML;
    
    // Add Twitter feed back
    addTwitterFeed(sidebar);
}

// Add Twitter feed to the sidebar
function addTwitterFeed(sidebar) {
    const twitterFeed = document.createElement('div');
    twitterFeed.className = 'twitter-feed';
    twitterFeed.innerHTML = `
        <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#1DA1F2" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
            </svg>
            Congo Twitter Profiles
        </h3>
        
        <div class="twitter-profile" onclick="showTwitterTimeline('pascal_mulegwa')">
            <div class="profile-header">
                <img src="/api/placeholder/40/40" alt="Pascal Mulegwa" class="profile-img">
                <div>
                    <div class="profile-name">Pascal Mulegwa</div>
                    <div class="profile-handle">@pascal_mulegwa</div>
                </div>
            </div>
        </div>
        
        <div class="twitter-profile" onclick="showTwitterTimeline('StanysBujakera')">
            <div class="profile-header">
                <img src="/api/placeholder/40/40" alt="Stanys Bujakera" class="profile-img">
                <div>
                    <div class="profile-name">Stanys Bujakera</div>
                    <div class="profile-handle">@StanysBujakera</div>
                </div>
            </div>
        </div>
        
        <div class="twitter-profile" onclick="showTwitterTimeline('wembi_steve')">
            <div class="profile-header">
                <img src="/api/placeholder/40/40" alt="Steve Wembi" class="profile-img">
                <div>
                    <div class="profile-name">Steve Wembi</div>
                    <div class="profile-handle">@wembi_steve</div>
                </div>
            </div>
        </div>
    `;
    
    sidebar.appendChild(twitterFeed);
}

// Toggle source expansion
function toggleSource(element) {
    event.stopPropagation();
    element.classList.toggle('active');
}

// Load article to main content
function loadArticle(articleId) {
    event.stopPropagation();
    
    const article = newsData.find(a => a.id === articleId);
    
    if (article) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <h1 class="content-title">${article.title}</h1>
            <div class="content-meta">
                <span>${article.source} | <span class="article-category">${article.category}</span></span>
                <span>${article.date}</span>
            </div>
            <div class="content-body">
                ${article.content}
            </div>
            ${article.link ? `
            <a href="${article.link}" target="_blank" class="article-source-link">
                Read the original article on ${article.source} →
            </a>
            ` : ''}
        `;
    }
}

// Display Twitter timeline
function showTwitterTimeline(handle) {
    const mainContent = document.getElementById('main-content');
    
    mainContent.innerHTML = `
        <h2>Twitter Timeline: @${handle}</h2>
        <div class="twitter-timeline-container">
            <a class="twitter-timeline" data-height="600" data-theme="dark" href="https://twitter.com/${handle}?ref_src=twsrc%5Etfw">Tweets by ${handle}</a>
            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>
    `;
}
