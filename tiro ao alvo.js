let tela = document.querySelector("canvas")
let pincel = tela.getContext("2d")
let intervalo
let raio = 10
let pontuacao
const jogadores = []
const points = []
let x = -1
let i = -1

pincel.strokeStyle = "black"
pincel.strokeRect(0, 0, 940, 380)

function desenhaCirculo(x, y, raio, cor) {
  pincel.fillStyle = cor
  pincel.beginPath()
  pincel.arc(x, y, raio, 0, 2 * Math.PI)
  pincel.fill()
}

function posicao(maximo) {
  let posicaoMax = Math.floor(Math.random() * maximo)

  if (posicaoMax > 40) return posicaoMax
}

function atualizaTela() {
  pincel.clearRect(0, 0, 940, 380)
  pincel.strokeStyle = "black"
  pincel.strokeRect(0, 0, 940, 380)

  let xAlvo = posicao(900)
  let yAlvo = posicao(360)
  // console.log(xAlvo, yAlvo);

  desenhaCirculo(xAlvo, yAlvo, raio + 30, "#000000")
  desenhaCirculo(xAlvo, yAlvo, raio + 20, "#3eaef4")
  desenhaCirculo(xAlvo, yAlvo, raio + 10, "red")
  desenhaCirculo(xAlvo, yAlvo, raio, "yellow")

  mudaTempo(velocidade())

  function dispara(evento) {
    var x = evento.pageX - tela.offsetLeft
    var y = evento.pageY - tela.offsetTop

    console.log("x=" + x + ";" + "y=" + y)

    if (
      x > xAlvo - raio &&
      x < xAlvo + raio &&
      y > yAlvo - raio &&
      y < yAlvo + raio
    ) {
      pontuacao++

      exibirNaTela(jogadores, pontuacao)
    }
  }

  tela.onclick = dispara
}

//----------------------------------------------------------
//   BLoco: altera velocidade alvo

function mudaTempo(muda) {
  clearInterval(intervalo)
  intervalo = setInterval(atualizaTela, muda * 500)
}

function velocidade() {
  return document.querySelector(".range-vel").value
}

// Bloco: Timer jogo

function iniciar(duration) {
  duration
  display = document.querySelector(".timer")
  startTimer(duration)
}

function startTimer(duration) {
  var timer = duration

  // alert("Você tem " + duration + "s , boa partida!")

  let x = setInterval(function () {
    seconds = parseInt(timer % 60, 10)
    seconds =
      seconds < 10
        ? "Tempo restante: 0" + seconds
        : "Tempo restante: " + seconds

    display.textContent = seconds

    if (--timer < 0) {
      clearInterval(x)

      display.textContent = "O seu tempo acabou!"
      // alert("Seu tempo acabou! Agora é a vez do proximo desafiante.")
      clearInterval(intervalo)
      placaFim()
      // if (isNaN(pontuacao) == false) {
      //   points.push(pontuacao)

      //   exibirNovoJogador(jogadores)
      // }
    }
  }, 1000)
}

// -------------------------------------------------------------------------
// Bloco: adiciona jogador e pontos na tela

const gamer = document.querySelector("input")
const tabelaElemento = document.getElementById("tabelaJogadores")
const ranking = document.getElementById("tabelaRanking")

function adicionarJogador(nomePlayer) {
  jogadores.push(nomePlayer)

  pontuacao = 0
  exibirNaTela(jogadores, pontuacao)
} // função ativada no botão - HTML

function exibirNaTela(desafiante, pontos) {
  for (let i = 0; i < jogadores.length; i++) {
    desafiante = {
      nome: jogadores[i],
      pontos: pontos,
    }

    document.querySelector("input").value = ""
  }

  tabelaElemento.innerHTML = `
        <br>
        <tr>
            <td>${desafiante.nome}</td>
            <br>
            <td>${desafiante.pontos}</td>
        </tr>

  `

  atualizaTela()
}
function exibirNovoJogador(desafiante) {
  i++

  desafiante = {
    nome: jogadores[i],
    pontos: points[i],
  }

  document.querySelector("input").value = ""

  ranking.innerHTML += `
        <br>
        <tr>
            <td>${desafiante.nome}</td>
            <br>
            <td>${desafiante.pontos}</td>
        </tr>

  `
}

function placaInicio(duration, done) {
  var box = $("#ready")
  box.find(".message").text("Você tem " + duration + "s , boa partida!")
  box
    .find(".btn")
    .unbind()
    .click(function () {
      box.hide()
      adicionarJogador(gamer.value)
      iniciar(duration)
    })
  box.find(".btn").click(done)
  box.show()
}

function placaFim(done) {
  var box = $("#ready")
  box
    .find(".message")
    .text("Seu tempo acabou! Agora é a vez do proximo desafiante.")
  box
    .find(".btn")
    .unbind()
    .click(function () {
      box.hide()

      if (isNaN(pontuacao) == false) {
        points.push(pontuacao)

        exibirNovoJogador(jogadores)
      }
    })
  box.find(".btn").click(done)
  box.show()
}
