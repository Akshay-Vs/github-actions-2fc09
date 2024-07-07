const { JSDOM } = require('jsdom');

const normalizeURL = (urlString) => {
  try {
    const url = new URL(urlString);
    const hostPath = url.hostname.concat(url.pathname);

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
      return hostPath.slice(0, -1);
    }
    return hostPath;
  } catch (error) {
    console.log(`Invalid URL: ${urlString}`, error);
    return null;
  }
};

const getUrlsFromHTML = (htmlBody, baseUrl) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');

  for (const linkElement of linkElements) {
    let href = linkElement.getAttribute('href');

    if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
      continue;
    }

    if (href && href.startsWith('/')) {
      href = new URL(href, baseUrl).toString();
    }

    const normalizedHref = normalizeURL(href);
    if (normalizedHref) {
      urls.push(href);
    }
  }

  return urls;
};

const crawlPage = async (baseUrl, currentUrl, pages) => {
  console.log("Now Crawling", currentUrl);

  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);

  if (baseUrlObj.hostname !== currentUrlObj.hostname) return pages;

  const normalizedCurrentUrl = normalizeURL(currentUrl);
  if (normalizedCurrentUrl === null) {
    return pages;
  }

  if (pages[normalizedCurrentUrl]) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }
  pages[normalizedCurrentUrl] = 1;

  try {
    const res = await fetch(currentUrl);

    if (res.status > 399) {
      console.log("Error in fetching page", res.status);
      return pages;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log("content type is not supported, skipping", currentUrl);
      return pages;
    }

    const htmlBody = await res.text();
    const nextURLs = getUrlsFromHTML(htmlBody, baseUrl);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseUrl, nextURL, pages);
    }
  } catch (err) {
    console.log(err);
  }

  return pages;
};

module.exports = {
  normalizeURL,
  getUrlsFromHTML,
  crawlPage
};