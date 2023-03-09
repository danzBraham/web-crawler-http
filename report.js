export function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((pageA, pageB) => {
    return pageB[1] - pageA[1];
  });
  return pagesArr;
}

export function printReport(pages) {
  console.log();
  console.log("===== REPORT =====");
  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    console.log(`Found ${sortedPage[1]} links connected to ${sortedPage[0]}`);
  }
  console.log("===== END REPORT =====");
}
