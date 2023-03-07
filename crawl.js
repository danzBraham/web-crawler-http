import jsdom from "jsdom";
const { JSDOM } = jsdom;

export async function crawlPage(currentURL) {
  console.log(`Actively crawling: ${currentURL}`);
  try {
    const response = await fetch(currentURL);
    if (response.status > 399) {
      console.log(
        `Error in fetch with status code: ${response.status}, on page: ${currentURL}`
      );
      return;
    }
    const contentType = response.headers.get("Content-Type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Error in fetch with headers: ${contentType}, on page: ${currentURL}`
      );
      return;
    }
    console.log(await response.text());
  } catch (err) {
    console.log(`Error in fetch: ${err.message}, on page: ${currentURL}`);
  }
}

export function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
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

export function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const fullURL = `${urlObj.hostname}${urlObj.pathname}`;

  // Using if
  // if (fullURL.length > 0 && fullURL.slice(-1) === "/") {
  //   return fullURL.slice(0, -1);
  // }

  // Using ternary
  return fullURL.endsWith("/") ? fullURL.slice(0, -1) : fullURL;
}
