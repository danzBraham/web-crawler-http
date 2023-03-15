import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test("normalizeURL strip protocol", () => {
  const input = "https://github.com/danzBraham";
  const output = normalizeURL(input);
  const expected = "github.com/danzBraham";
  expect(output).toEqual(expected);
});

test("normalizeURL strip trail slash", () => {
  const input = "https://github.com/danzBraham/";
  const output = normalizeURL(input);
  const expected = "github.com/danzBraham";
  expect(output).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://GITHUB.com/danzBraham/";
  const output = normalizeURL(input);
  const expected = "github.com/danzBraham";
  expect(output).toEqual(expected);
});

test("normalizeURL handle invalid input", () => {
  const input = "";
  const output = normalizeURL(input);
  const expected = "";
  expect(output).toEqual(expected);
});

test("normalizeURL handle query parameters and fragments", () => {
  const input = "https://github.com/danzBraham?tab=overview#about-me";
  const output = normalizeURL(input);
  const expected = "github.com/danzBraham";
  expect(output).toEqual(expected);
});

test("normalizeURL handle URLs with different protocols", () => {
  const input = "ftp://ftp.example.com";
  const output = normalizeURL(input);
  const expected = "ftp.example.com";
  expect(output).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://github.com">My Github Link</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://github.com";
  const output = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://github.com/"];
  expect(output).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/danzBraham">My Github Link</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://github.com";
  const output = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://github.com/danzBraham"];
  expect(output).toEqual(expected);
});

test("getURLsFromHTML handle different types of relative URLS", () => {
  const inputHTMLBody = `
  <html>
  <body>
      <a href="https://github.com/Mezzky">Mezzky Github Link</a>
      <a href="/danzBraham">My Github Relative Link</a>
      <a href="/yourengab">My Github Relative Link</a>
      <a href="../yanasbruh">My Github Relative Link</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://github.com";
  const output = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://github.com/Mezzky",
    "https://github.com/danzBraham",
    "https://github.com/yourengab",
    "https://github.com/yanasbruh",
  ];
  expect(output).toEqual(expected);
});

test("getURLsFromHTML handle error", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="invalid">Invalid URL</a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://github.com";
  const output = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(output).toEqual(expected);
});
