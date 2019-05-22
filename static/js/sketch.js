var socket
var usuario_id
var colored = 'black'
var type = undefined
var sizeof = 15
var font
var fontsize = 20
var tema
var tema_original
var key_words = [
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

//taking color


let paletas = document.getElementsByClassName('fa-palette')
for(let paleta of paletas) {
  paleta.addEventListener('click', (e) => {
    colored = e.target.parentNode.style.color
    let aviso = 'cor selecionada : ' + colored
  })
}

let brush = document.getElementById('brush')
brush.addEventListener('click', (e) => {
  type = 'brush'
  sizeof = 40
  let aviso = 'tipo selecionado : ' + type
})
let pencil = document.getElementById('pencil')
pencil.addEventListener('click', (e) => {
  type = 'pencil'
  sizeof = 15
  let aviso = 'tipo selecionado : ' + type
})
let eraser = document.getElementById('eraser')
eraser.addEventListener('click', (e) => {
  type = 'eraser'
  sizeof = 50
  let aviso = 'tipo selecionado : ' + type
})

let button = document.getElementById('send')
button.addEventListener('click', (e) => {
  sendMessageToServer()
})

let input = document.getElementById('input_msg')
function sendMessageToServer() {
    let text_ = input.value
    if(text_ == tema_original) {
      alert('Voce acertou, parabens!')
      socket.emit('finishRound',  {reload: true})
    }
    input.value = ''
    socket.emit('processingMessageBackend', {
      text: text_,
      user: usuario_id
    })

}

function addMessage(msg) {
  let ballon = document.createElement('hgroup')
  let p = document.createElement('p')
  let father_div = document.getElementById('bodydesc')

  p.id = 'msg'
  p.textContent = msg.text

  ballon.appendChild(p)
  father_div.appendChild(ballon)

  if(msg.user != usuario_id) {
    ballon.className = 'speech-bubble-left'
    ballon.style = 'width: 136; margin-left: 19px'
  } else {
    ballon.className = 'speech-bubble-right'
    ballon.style = 'width: 136; margin-left: 83px'
  }

  father_div.scrollTop = father_div.scrollHeight;

  

}

function preload() {
  font = loadFont('static/fonts/Montserrat-Regular.otf');

}
function keyPressed() {
  if(keyCode == 13) {
    sendMessageToServer()
  }
}

function setup() {
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  frameRate(40)
  createCanvas(500, 510)
  background('#6497b1')
  socket = io('http://localhost:8080', {reconnect: true});
  socket.on('connect', (my_socket) => {
    usuario_id = random(50)
    let room = window.location.pathname
    socket.emit('userConnection', {user : usuario_id, room: room})
    console.log('Conectado!')
  })

  socket.on('sendingDataFrontend', (data) => {
    if(data.type == 'eraser') {
      fill('#6497b1')
    } else {
      fill(data.color)
    }
    noStroke()
    ellipse(data.coords.x, data.coords.y, data.size)
  })
  socket.on('sendingMessageFrontend', (msg) => {
    addMessage(msg)
  })

  socket.on('selectingTheme', (theme) => {
    tema_original = theme.theme
    tema = ''
    let word;
    if(theme.user != usuario_id) {
      word = 'dica : ' + hideWord(theme.theme)
    } else {
      word = 'tema : ' + theme.theme
    }
    tema = word
  })

  socket.on('reloadPage', (data) => {
    if(data.reload == true) {
      location.reload()
    }
  })
}

var pressionado = false
function mousePressed() {
  pressionado = true
}
function mouseReleased() {
  pressionado = false
}
function drawWords(x, word) {
  fill(0, 0, 120);
  text(word, x, 20);
}


function hideWord(word) {
  let new_word = ''
  for(let i = 0; i < word.length; i++) {
    let random_number = Math.random()

    if(word[i] != ' ') {
      if(random_number > 0.5) {
        new_word += word[i] + ' '
      } else {
        new_word += '_ '
      }
    } else {
      new_word += ' '
    }

  }
  return new_word
}

function draw() {
  if(tema != undefined) {
    textAlign(CENTER);
    drawWords(250, tema)
    if(pressionado && tema.indexOf('tema') > -1) {
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

}

