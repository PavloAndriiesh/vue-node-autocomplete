const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const fs = require('fs')
const cors = require('cors')

const data = JSON.parse(fs.readFileSync('./birds.json', 'utf8'))
const cachedResponses = {}

app.use(express.static(__dirname))
app.use(cors())
app.options('*', cors())

app.get('/data', (req, res) => {
  const query = req.query.searchQuery
  const getNamesByIndexes = indexes => indexes.map(index => data[index])

  if (cachedResponses[query]) {
    res.send({data: getNamesByIndexes(cachedResponses[query])})

  } else {
    const response = []

    for (let i=0; i<data.length; i++) {
      if (data[i].toLowerCase().indexOf(query.toLowerCase()) > -1) {
        response.push(i)
      }

      if (response.length === 5) {
        break
      }
    }


    cachedResponses[query] = response
    res.send({data: getNamesByIndexes(cachedResponses[query])})
  }
})

app.listen(PORT, () => {
  console.log('Node/Express app started on port ' + PORT)
})

