var socket
function setup() {
  let teste = createVector(100, 50)
  console.log(teste)
  socket = io('http://localhost:8080', {reconnect: true});
  socket.on('connect', function (socket) {
    console.log('Conectado!')
  })
  socket.emit('testando', {text: 'meuTexto'})
}



var mouseStillDown = false;
var interval;
var contador = 0

$('#botao').mousedown(function(event) {
    mouseStillDown = true;
    doSomething();
});

function doSomething() {
  if (!mouseStillDown) { return; }                                      

  if (mouseStillDown) {
    interval = setInterval(() => {
      socket.emit('testando', {text: contador})
      contador += 1
      console.log('lul', contador)

    }, 100);
  }
}

$('#botao').mouseup(function(event) {
    mouseStillDown = false;
    clearInterval(interval)
});

function draw() {}

