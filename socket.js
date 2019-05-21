const express = require('express')
const http = require('http').Server(express)
const io = require('socket.io')(http, { origins: '*:*' })

let port = 8080

//socket development
io.on('connection', (socket) => {
  console.log('conectou')
  socket.on('processingDataBackend', (data) => {
    console.log('data recebida', data)
    io.emit('sendingDataFrontend', data)
  })
  socket.on('processingMessageBackend', (msg) => {
    console.log('recebi a mensagem: ', msg.text)
    io.emit('sendingMessageFrontend', msg)
  })
})

//server running
http.listen(port, () => {
  console.log('websockets rodando na porta:', port)
})

