function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const fullURL = `${urlObj.hostname}${urlObj.pathname}`;

  // Using if
  // if (fullURL.length > 0 && fullURL.slice(-1) === "/") {
  //   return fullURL.slice(0, -1);
  // }

  // Using ternary
  return fullURL.endsWith("/") ? fullURL.slice(0, -1) : fullURL;
}

module.exports = normalizeURL;
