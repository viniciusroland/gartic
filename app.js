const express = require('express')
const app = express()
const port = 8000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/static', express.static('static'))

app.get('/:room', (req, res) => {
  res.sendFile(__dirname + '/templates/index.html')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/templates/home.html')
})

app.post('/process/data', (req, res) => {
  console.log('postei')
  console.log(req.body.userName)
  console.log(req.body.roomName)
  //res.sendFile(__dirname + '/templates/home.html')
  //let url = '/' + req.body.roomName + '/' + req.body.userName
  let url = '/' + req.body.roomName + '_' + req.body.userName
  res.redirect(url)
})


app.listen(port, () => {
  console.log('listening on port: ', port)
})
