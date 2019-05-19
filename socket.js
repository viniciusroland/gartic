const express = require('express')
const http = require('http').Server(express)
const io = require('socket.io')(http, { origins: '*:*' })

let port = 8080

//socket development
io.on('connection', (socket) => {
  console.log('conectou')
  socket.on('testando', (data) => {
    console.log('testando a funcao de teste')
    console.log('minha data', data.text)
  })
})

//server running
http.listen(port, () => {
  console.log('websockets rodando na porta:', port)
})

