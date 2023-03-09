export function sortPages(pages) {
  return Object.entries(pages).sort((pageA, pageB) => pageB[1] - pageA[1]);
}

export function printReport(pages) {
  console.log(`===== REPORT =====`);
  const sortedPages = sortPages(pages);
  sortedPages.forEach(([page, count]) => {
    console.log(`Found ${count} links connected to ${page}`);
  });
  console.log(`===== END REPORT =====`);
}
