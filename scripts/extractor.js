const fs = require('fs')
const delay = require('delay')
const readline = require('readline')

const inputFileName = process.argv[2];
const outputFileName = process.argv[3];
if (!inputFileName) {
  throw new Error('Missing input file name from CLI args.')
}

if (!outputFileName) {
  throw new Error('Missing output file name from CLI args.')
}

const fileStream = fs.createReadStream(inputFileName)
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
})

const startTime = new Date()
const messages = []
const dataPointIndex = 8;
rl.on('line', (line) => {
  message_prefix = line.substr(0,2)
  if (message_prefix === '1,') {
    // debug message
  } else if (message_prefix === '0,') {
    data = line.split(',')
    met = +data[2];
    state = data[5];
    value = data[dataPointIndex];

    messages.push(`${met},${state},${value}`)
  }
})

fileStream.on('end', async () => {
  fs.writeFile(outputFileName, messages.join('\n'), err => {
    if (err) {
      console.error(err)
      return
    }
  })
})
