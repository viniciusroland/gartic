const express = require('express')
const app = express()
const port = 8000

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/templates/index.html')
})


app.listen(port, () => {
  console.log('listening on port: ', port)
})
