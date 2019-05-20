var socket
var usuario_id
function setup() {
  frameRate(40)
  createCanvas(500, 500)
  background(128)
  socket = io('http://localhost:8080', {reconnect: true});
  socket.on('connect', function (socket) {
    usuario_id = random(50)
    console.log('Conectado!')
  })
  socket.on('sendingDataFrontend', (data) => {
    var color;
    if(data.user != usuario_id) {
      color = 0
    } else {
      color = 255
    }
    fill(color)
    noStroke()
    ellipse(data.coords.x, data.coords.y, 40)
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
    }})
  }
}

