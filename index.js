const express = require('express');
const scrape = require('./scrape');
const generateRSS = require('./generateRSS');

const app = express();
const PORT = 8000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/rss', async (req, res) => {
  try {
    const articles = await scrape();
    if (articles.length === 0) {
      throw new Error('No articles scraped');
    }
    const rssFeed = generateRSS(articles);
    res.type('application/rss+xml');
    res.send(rssFeed);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).send('Error generating RSS feed');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
