/*global io*/
const socket = io(`http://${window.location.hostname}:3010`)

document.addEventListener("DOMContentLoaded", () => {
  const up = document.getElementById('up')
  const down = document.getElementById('down')
  const register = document.getElementById('register')  
  const stats = document.getElementById('stats')
  const nick = document.getElementById('nick')
  const registremain = document.getElementById('registremain')
  var arrst = []

  register.addEventListener('click', () => {
    console.log('registrando')

    if (nick.value !== '') {
      socket.emit('register', {
        nick: nick.value
      })
      registremain.innerHTML = ""
    }
  })

  up.addEventListener('mousedown', () => {
    console.log('clicat up')
    socket.emit('up')
  })
  
  up.addEventListener('mouseup', () => {
    console.log('clicat stop')
    socket.emit('stop')
  })

  down.addEventListener('mousedown', () => {
    console.log('clicat down')
    socket.emit('down')
  })

  down.addEventListener('mouseup', () => {
    console.log('clicat stop')
    socket.emit('stop')
  })

  socket.on('connect', () => {
    console.log('Estic conectat')
    socket.on('stats', data => {
      arrst.push(JSON.stringify(data))
      stats.innerHTML = arrst.join('<br>')
    })
  })
  
  socket.on('disconnect', () => {
    console.log(`${socket.id} Estic desconectat`)
  })
})
