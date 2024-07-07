const { crawlPage } = require('./crawler/crawl');

const main = async () => {
  const baseUrl = 'https://opensource.com/';
  const pages = {};

  console.log(`Started crawling '${baseUrl}'...`);

  await crawlPage(baseUrl, baseUrl, pages);

  console.log('Crawling complete.');
  console.log(pages);
};

main().catch(err => {
  console.error('Error in main function:', err);
});