const express = require('express')
const http = require('http').Server(express)
const io = require('socket.io')(http, { origins: '*:*' })
const url = require('url')
//var adr = 'http://localhost:8000/room';
//var q = url.parse(adr, true);
//
//console.log(q.pathname); //returns '/default.htm'

let port = 8080
let possible_themes = [
  'corno',
  'polijunior',
  'mariana',
  'programacao',
  'cinema',
  'harry potter',
  'poli',
  'abacate',
  'irmao do jorel',
  'game of thrones',
  'thanos',
  'homem de ferro',
  'audiovisual',
  'eca',
  'camera',
  'bolsonaro'
]
let users = []

function selectTheme(themes) {
  let maximum = themes.length
  let random_number = Math.random()
  let index = parseInt(random_number * maximum)

  return themes[index]

}
function selectUser(list_users) {
  let user = list_users[Math.floor(Math.random()*list_users.length)]
  return user

}
var room;


//socket development
io.on('connection', (socket) => {
  console.log('> Socket.io conectado!')

  socket.on('userConnection', (data) => {
    users.push(data.user)
    room = data.room
    socket.join(room)
    if(users.length > 1) {
      let theme = selectTheme(possible_themes)
      let user = selectUser(users)
      //io.emit('selectingTheme', {
      io.to(room).emit('selectingTheme', {
        theme : theme,
        user : user
      })
      
      io.to(room).emit('showJoinedUsers', {users: users})
      users = []
    }
  })

  socket.on('finishRound', (data) => {
    //io.emit('reloadPage', data)
    io.to(room).emit('reloadPage', data)
  })

  socket.on('processingDataBackend', (data) => {
    //io.emit('sendingDataFrontend', data)
    io.to(room).emit('sendingDataFrontend', data)
  })
  socket.on('processingMessageBackend', (msg) => {
    //io.emit('sendingMessageFrontend', msg)
    io.to(room).emit('sendingMessageFrontend', msg)
  })

  socket.on('processingThemeBackend', (theme) => {
    //io.emit('sendingThemeFrontend', theme)
    io.to(room).emit('sendingThemeFrontend', theme)
  })
})

//server running
http.listen(port, () => {
  console.log('> Socket.io rodando na porta: ', port)
})

