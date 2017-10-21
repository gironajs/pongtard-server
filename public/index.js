const socket = io('http://localhost:3010')

document.addEventListener("DOMContentLoaded", () => {
  const up = document.getElementById('up')
  const down = document.getElementById('down')
  const stats = document.getElementById('stats')
  var arrst = []

  up.addEventListener('click', () => {
    console.log('clicat up')
    socket.emit('up')
  })
  
  down.addEventListener('click', () => {
    console.log('clicat down')
    socket.emit('down')
  })

  socket.on('connect', () => {
    console.log('Estic conectat')
    socket.on('stats', data => {
      arrst.push(JSON.stringify(data))
      stats.innerHTML = arrst.join('<br>')
    })
  })
  
  socket.on('disconnect', () => {
    console.log('Estic desconectat')
  })
})
