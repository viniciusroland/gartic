var socket
var usuario_id
var colored = 'black'
var type = undefined
var sizeof = 15

//taking color

let paletas = document.getElementsByClassName('fa-palette')
for(let paleta of paletas) {
  console.log(paleta)
  paleta.addEventListener('click', (e) => {
    colored = e.target.parentNode.style.color
    let aviso = 'cor selecionada : ' + colored
    console.log(aviso)
  })
}

let brush = document.getElementById('brush')
brush.addEventListener('click', (e) => {
  type = 'brush'
  sizeof = 40
  let aviso = 'tipo selecionado : ' + type
  console.log(aviso)
})
let pencil = document.getElementById('pencil')
pencil.addEventListener('click', (e) => {
  type = 'pencil'
  sizeof = 15
  let aviso = 'tipo selecionado : ' + type
  console.log(aviso)
})
let eraser = document.getElementById('eraser')
eraser.addEventListener('click', (e) => {
  type = 'eraser'
  sizeof = 50
  let aviso = 'tipo selecionado : ' + type
  console.log(aviso)
})

function setup() {
  frameRate(40)
  createCanvas(500, 508)
  background(128)
  socket = io('http://localhost:8080', {reconnect: true});
  socket.on('connect', function (socket) {
    usuario_id = random(50)
    console.log('Conectado!')
  })
  socket.on('sendingDataFrontend', (data) => {
    if(data.type == 'eraser') {
      fill(128)
    } else {
      fill(data.color)
    }
    noStroke()
    console.log(data.size)
    ellipse(data.coords.x, data.coords.y, data.size)
  })
}
var pressionado = false
function mousePressed() {
  pressionado = true
}
function mouseReleased() {
  pressionado = false
}

function draw() {
  if(pressionado) {
    socket.emit('processingDataBackend', {
      user: usuario_id,
      coords : {
        x: mouseX,
        y: mouseY
      },
      color: colored,
      type: type,
      size: sizeof
    })
  }
}

