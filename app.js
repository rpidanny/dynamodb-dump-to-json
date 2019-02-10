const fs = require('fs')
const { cleanupObject } = require('./utils')

const inputFile = process.argv[2]
const outputFile = process.argv[3]

if ( inputFile && outputFile ) {
  const lineReader = require('readline').createInterface({
    input: fs.createReadStream(inputFile)
  });
  const jsonData = []
  console.log(`Converting ${inputFile} to JSON`);
  console.time('time')
  lineReader.on('line', (line) => {
    const raw= JSON.parse(line)
    const cleaned = cleanupObject(raw)
    jsonData.push(cleaned)
  }).on('close', function() {
    fs.writeFile(outputFile, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        throw err
      }
      console.log('Conversion complete.');
      console.timeEnd('time')
      process.exit(0);
    });
  });
} else {
  console.log('Invalid Argument')
}