import { normalizeURL } from "./crawl.js";

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
