import { sortPages } from "./report.js";

test("Sort 2 pages", () => {
  const input = {
    "https://danzBraham.com/blogs": 1,
    "https://danzBraham.com": 2,
  };
  const output = sortPages(input);
  const expected = [
    ["https://danzBraham.com", 2],
    ["https://danzBraham.com/blogs", 1],
  ];
  expect(output).toEqual(expected);
});

test("Sort 5 pages", () => {
  const input = {
    "https://danzBraham.com/blogs/atom": 2,
    "https://danzBraham.com/blogs/nuclear": 3,
    "https://danzBraham.com/blogs": 4,
    "https://danzBraham.com/blogs/gpt": 5,
    "https://danzBraham.com": 6,
  };
  const output = sortPages(input);
  const expected = [
    ["https://danzBraham.com", 6],
    ["https://danzBraham.com/blogs/gpt", 5],
    ["https://danzBraham.com/blogs", 4],
    ["https://danzBraham.com/blogs/nuclear", 3],
    ["https://danzBraham.com/blogs/atom", 2],
  ];
  expect(output).toEqual(expected);
});

test("Sort null pages", () => {
  const input = {};
  const output = sortPages(input);
  const expected = [];
  expect(output).toEqual(expected);
});
