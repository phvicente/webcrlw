const PDFDocument = require('pdfkit')
const fs = require('fs')


function printReport(pages){
    console.log('==========')
    console.log('REPORT')
    console.log('==========')
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages){
      const url = sortedPage[0]
      const count = sortedPage[1]
      console.log(`Found ${count} internal links to ${url}`)
    }
  }
  

  function sortPages(pages){
    const pagesArr = Object.entries(pages)
    pagesArr.sort((pageA, pageB) => {
      return pageB[1] - pageA[1]
    })
    return pagesArr
  }

  function generatePDFReport(pages) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('report.pdf'));

    doc.fontSize(25).text('Crawl Report', {
        underline: true,
    });

    const sortedPages = sortPages(pages);
    sortedPages.forEach(([url, count], index) => {
        doc.fontSize(12).text(`${index + 1}. ${url} - ${count} links`, {
            paragraphGap: 5,
            indent: 5,
            align: 'left',
            lineGap: 2,
        });
    });

    doc.end();
    console.log('The PDF report has been generated.');
}


  
  module.exports = {
    printReport,
    sortPages,
    generatePDFReport
  }