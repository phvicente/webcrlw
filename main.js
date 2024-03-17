const { page } = require('pdfkit')
const { crawlPage } = require('./crawl.js')
const { printReport, generatePDFReport } = require('./report.js')

async function main(){
  if (process.argv.length < 3){
    console.log('no website provided')
  }
  if (process.argv.length > 4){
    console.log('too many arguments provided')
  }

  const baseURL = process.argv[2]
  const outputFormat = process.argv[3]

  console.log(`starting crawl of: ${baseURL}...`)

  const pages = await crawlPage(baseURL, baseURL, {})

  if(outputFormat === 'pdf') {
    await generatePDFReport(pages)
  } else {
    printReport(pages)
  }


}

main()
