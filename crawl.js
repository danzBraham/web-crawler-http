import jsdom from "jsdom";
const { JSDOM } = jsdom;

export function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const fullURL = `${urlObj.hostname}${urlObj.pathname}`;
  return fullURL.endsWith("/") ? fullURL.slice(0, -1) : fullURL;
}

export function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.startsWith("/")) {
      // relative
      try {
        const url = new URL(linkElement.href, baseURL);
        urls.push(url.href);
      } catch (err) {
        console.log(`Error with relative url: ${err.message}`);
      }
    } else {
      // absolute
      try {
        const url = new URL(linkElement.href);
        urls.push(url.href);
      } catch (err) {
        console.log(`Error with absolute url: ${err.message}`);
      }
    }
  }
  return urls;
}

export async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (currentURLObj.hostname !== baseURLObj.hostname) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  pages[normalizedURL] = 1;

  console.log(`Crawling: ${currentURL}`);
  let htmlBody = "";
  try {
    const response = await fetch(currentURL);
    if (response.status > 399) {
      console.log(
        `Error in fetch with status code: ${response.status}, on page: ${currentURL}`
      );
      return pages;
    }
    const contentType = response.headers.get("Content-Type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Error in fetch with headers: ${contentType}, on page: ${currentURL}`
      );
      return pages;
    }
    htmlBody = await response.text();
  } catch (err) {
    console.log(`Error in fetch: ${err.message}, on page: ${currentURL}`);
  }

  const nextURLs = getURLsFromHTML(htmlBody, baseURL);
  for (const nextURL of nextURLs) {
    pages = await crawlPage(baseURL, nextURL, pages);
  }

  return pages;
}
