const io = require('socket.io')({ transports: ['websocket'] })
const express = require('express')
const app = express()
const conf = require('./conf')
var users = []
mainboard = ''

io.attach(conf.socket_port)

app.use(express.static('public'))

app.listen(conf.http_port, () => {
  console.log(`HTTP PORT: ${conf.http_port}`)
})

setInterval(() => {
  console.log(`
    ${JSON.stringify(users)}
    ---------------------------
  `)
}, 2000)
  
io.on('connection', socket => {
  console.log(`USUARI CONECTAT: ${socket.id}`)

  socket.on('register', data => {
    if (data.nick === 'mainboard') {
      console.log(`RECIBIENDO PARTIDAAAA DE ${socket.id}`)
      mainboard = socket.id
      //users[mainboard]
    } else if (data.nick !== undefined) {
      if (mainboard !== '') {
        users.push({ socket: socket.id, nick: data.nick })
      } else {
        socket.emit('status', { ev : "NO HI HA PARTIDA" })
        console.log("NO HI HA PARTIDA CABRO!")
      }
    }
  })

  socket.on('up', () => {
    const us = users.filter(usr => usr.socket === socket.id)
    console.log(`${us.nick} -> UP!`)        
    io.to(mainboard).emit('up', {
      socket: socket.id,
      nick: us.nick
    })
  })

  socket.on('down', () => {
    const us = users.filter(usr => usr.socket === socket.id)
    console.log(`${us.nick} -> DOWN!`)    
    io.to(mainboard).emit('down', {
      socket: socket.id,
      nick: us.nick
    })
  })

  socket.on('stop', () => {
    const us = users.filter(usr => usr.socket === socket.id)
    console.log(`${us.nick} -> STOP!`)        
    io.to(mainboard).emit('stop', {
      socket: socket.id,
      nick: us.nick
    }) 
  })

  socket.on('disconnect', () => {
    console.log(`DESCONEXIO ${socket.id}`)
    if (socket.io === mainboard) {
      console.log(`-> DESCONECTADO MAINBOARD`)
      mainboard = ''
      users = []
    } else {
      const us = users.filter(usr => usr.socket === socket.id)
      if (us.nick === undefined) {
        console.log(`${socket.id} -> DESCONECTADO USUARIO NO REGISTRADO!`)    
      } else { 
        console.log(`${us.nick} -> DESCONECTADO USUARIO REGISTRADO!`)        
        users = users.filter(usr => usr.socket !== socket.id)
      }
    }
  })
})