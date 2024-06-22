const axios = require('axios');
const cheerio = require('cheerio');

const scrape = async () => {
  try {
    const url = 'https://www.bbc.co.uk/search?q=parking+UK';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const articles = [];

    $('.ssrcss-18mhvre-Promo.e1vyq2e80').each(function () {
      const title = $(this).find('.ssrcss-its5xf-PromoLink.exn3ah91').text();
      const url = $(this).find('a').attr('href');
      const description = $(this).find('.ssrcss-1q0x1qg-Paragraph.e1jhz7w10').text();
      articles.push({ title, url, description });
    });

    console.log(articles); // Logging articles to ensure they are populated correctly

    return articles;
  } catch (error) {
    console.error('Error during scraping:', error);
    throw error; // Propagate the error back to the caller (server.js)
  }
};

module.exports = scrape;
