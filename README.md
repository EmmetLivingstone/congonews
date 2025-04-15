# Congo News Aggregator

A news aggregator website focused on news from the Democratic Republic of Congo and the surrounding region, built to be deployed on GitHub Pages.

## Features

- **Daily News Aggregation**: Shows the latest news from several Congo-focused sources
- **Category Filtering**: Filter news by politics, security, economy, society, or environment
- **Source Filtering**: Filter news by specific sources
- **Search Functionality**: Search through news articles by keywords
- **Date Navigation**: Browse news from today, yesterday, or previous days
- **Twitter Integration**: View tweets from selected Congo journalists directly in the app
- **Dark Mode**: Sleek dark theme for comfortable reading
- **Mobile Responsive**: Works on both desktop and mobile devices

## News Sources

The aggregator includes content from:

- **Radio Okapi** (politique, securite, societe)
- **Actualite.cd** (securite, politique)
- **Radio France Internationale (RFI)** (DRC, Rwanda, and Burundi news)
- **Mines.cd** (mining news)

## Twitter Profiles

Features tweets from Congo-focused journalists:
- Pascal Mulegwa (@pascal_mulegwa)
- Stanys Bujakera (@StanysBujakera)
- Steve Wembi (@wembi_steve)

## Technical Implementation

This website is built with:
- HTML
- CSS
- JavaScript

It's designed to be hosted on GitHub Pages with no backend requirements. The news feed is static and would need to be updated via GitHub Actions in a real implementation.

## Deployment Instructions

1. Fork this repository
2. Enable GitHub Pages in your repository settings (Settings → Pages)
3. Select the main branch as the source
4. Your site will be available at `https://yourusername.github.io/repository-name/`

## Implementation Notes

In a production environment, you would:

1. Create a GitHub Action that runs daily to fetch fresh news from the sources
2. Parse the content and update the news-data.js file
3. Commit and push the changes automatically
4. This would keep your news feed updated daily without requiring a backend server

## File Structure

- `index.html` - Main HTML structure
- `styles.css` - CSS styling
- `news-data.js` - Contains the news articles data
- `app.js` - JavaScript functionality for filtering and displaying news

## License

[MIT License](LICENSE)
