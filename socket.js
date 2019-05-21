const express = require('express')
const http = require('http').Server(express)
const io = require('socket.io')(http, { origins: '*:*' })

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
  'irmao do jorel'
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

//socket development
io.on('connection', (socket) => {
  console.log('conectou')

  socket.on('userConnection', (data) => {
    users.push(data.user)
    if(users.length > 1) {
      let theme = selectTheme(possible_themes)
      let user = selectUser(users)
      io.emit('selectingTheme', {
        theme : theme,
        user : user
      })
      console.log(possible_themes, users)
      console.log(theme, user)
      users = []
    }
  })

  socket.on('processingDataBackend', (data) => {
    console.log('data recebida', data)
    io.emit('sendingDataFrontend', data)
  })
  socket.on('processingMessageBackend', (msg) => {
    console.log('recebi a mensagem: ', msg.text)
    io.emit('sendingMessageFrontend', msg)
  })

  socket.on('processingThemeBackend', (theme) => {
    console.log('recebi o tema: ', theme.theme)
    io.emit('sendingThemeFrontend', theme)
  })
})

//server running
http.listen(port, () => {
  console.log('websockets rodando na porta:', port)
})

