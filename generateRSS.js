const RSS = require('rss');

const generateRSS = (articles) => {
  const feed = new RSS({
    title: 'UK Parking News',
    description: 'Latest news about parking in the UK, categorized by location.',
    feed_url: 'http://localhost:8000/rss',
    site_url: 'http://localhost:8080',
    language: 'en',
  });

  articles.forEach(article => {
    // Debug log to check article data
    console.log('Adding article to feed:', article);
    feed.item({
      title: article.title || 'No title',
      description: article.description || 'No description',
      url: article.url,
      date: article.date || new Date(),
    });
  });

  return feed.xml({ indent: true });
};

module.exports = generateRSS;
