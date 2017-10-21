const io = require('socket.io')({ transports: ['websocket'] })
const express = require('express')
const app = express()
const conf = require('./conf')

io.attach(conf.socket_port)

app.use(express.static('public'))

app.listen(conf.http_port, () => {
  console.log(`HTTP PORT: ${conf.http_port}`)
})
  
io.on('connection', socket => {
  console.log(`USUARI CONECTAT: ${socket.id}`)
  socket.on('up', () => {
    console.log(`${socket.id} -> UP!`)
    io.emit('stats', {
      user: socket.id,
      ev: 'up'
    })
  })

  socket.on('down', () => {
    console.log(`${socket.id} -> DOWN!`)
    io.emit('stats', {
      user: socket.id,
      ev: 'down'
    })  
  })
})