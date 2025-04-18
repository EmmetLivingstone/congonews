// Global variables
let currentFilter = {
    category: 'all',
    source: 'all',
    search: ''
};
let newsData = [];
let newsByDate = {};
let currentDateKey = '';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    document.getElementById('category-filter').addEventListener('change', handleFilterChange);
    document.getElementById('source-filter').addEventListener('change', handleFilterChange);
    document.getElementById('search-input').addEventListener('input', handleFilterChange);
    
    document.getElementById('refresh-button').addEventListener('click', fetchLatestNews);
    document.getElementById('prevDay').addEventListener('click', goToPreviousDay);
    document.getElementById('nextDay').addEventListener('click', goToNextDay);
    
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
        const response = await fetch('/.netlify/functions/get-news');
        
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        
        // Store the news by date
        newsByDate = data.byDate || {};
        
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        
        // Set available dates for navigation
        const availableDates = Object.keys(newsByDate).sort().reverse();
        
        if (availableDates.length === 0) {
            throw new Error('No news articles found');
        }
        
        // See if today's news is available
        if (newsByDate[today] && newsByDate[today].length > 0) {
            currentDateKey = today;
            updateDateDisplay(currentDateKey);
        } else {
            // If no today's news, use the most recent date
            currentDateKey = availableDates[0];
            updateDateDisplay(currentDateKey, false);
        }
        
        // Load current date's news
        newsData = newsByDate[currentDateKey] || [];
        
        // Update last refreshed time
        const now = new Date();
        document.getElementById('last-refreshed').textContent = now.toLocaleString();
        
        // Update navigation buttons
        updateNavigationButtons(availableDates);
        
        // Apply current filters and display
        const filteredNews = filterArticles(newsData);
        displayNewsFeed(filteredNews);
    } catch (error) {
        console.error('Error:', error);
        sidebar.innerHTML = `<div class="error">Failed to fetch latest news. Please try again later.<br>${error.message}</div>`;
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

// Navigate to previous day
function goToPreviousDay() {
    const dates = Object.keys(newsByDate).sort().reverse();
    const currentIndex = dates.indexOf(currentDateKey);
    
    if (currentIndex < dates.length - 1) {
        currentDateKey = dates[currentIndex + 1];
        newsData = newsByDate[currentDateKey] || [];
        updateDateDisplay(currentDateKey);
        updateNavigationButtons(dates);
        
        // Apply current filters and display
        const filteredNews = filterArticles(newsData);
        displayNewsFeed(filteredNews);
    }
}

// Navigate to next day
function goToNextDay() {
    const dates = Object.keys(newsByDate).sort().reverse();
    const currentIndex = dates.indexOf(currentDateKey);
    
    if (currentIndex > 0) {
        currentDateKey = dates[currentIndex - 1];
        newsData = newsByDate[currentDateKey] || [];
        updateDateDisplay(currentDateKey);
        updateNavigationButtons(dates);
        
        // Apply current filters and display
        const filteredNews = filterArticles(newsData);
        displayNewsFeed(filteredNews);
    }
}

// Update date display
function updateDateDisplay(dateStr, isToday = true) {
    const dateObj = new Date(dateStr);
    let displayDate;
    
    if (isToday) {
        displayDate = `Today (${dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })})`;
    } else {
        displayDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    
    document.getElementById('currentDate').textContent = displayDate;
    document.getElementById('view-date').textContent = displayDate;
}

// Update navigation buttons
function updateNavigationButtons(dates) {
    const currentIndex = dates.indexOf(currentDateKey);
    
    document.getElementById('prevDay').disabled = (currentIndex >= dates.length - 1);
    document.getElementById('nextDay').disabled = (currentIndex <= 0);
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
                    <div class="profile-handle">
