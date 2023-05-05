
let tela = document.querySelector('canvas');
let pincel = tela.getContext('2d');
let intervalo;
let raio = 10;
let pontuacao = 0
let tempoJogo;
let jogadores = [];


pincel.strokeStyle = 'black';
pincel.strokeRect(0, 0, 940, 400);


function desenhaCirculo(x, y, raio, cor) {


    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();

}

function posicao(maximo) {

    let posicaoMax = Math.floor(Math.random() * maximo);

    if (posicaoMax > 40)

        return posicaoMax;
}

function atualizaTela() {


    pincel.clearRect(0, 0, 940, 400);
    pincel.strokeStyle = 'black';
    pincel.strokeRect(0, 0, 940, 400);

    let xAlvo = posicao(900);
    let yAlvo = posicao(360);
    // console.log(xAlvo, yAlvo);

    desenhaCirculo(xAlvo, yAlvo, raio + 30, "#000000");
    desenhaCirculo(xAlvo, yAlvo, raio + 20, '#3eaef4');
    desenhaCirculo(xAlvo, yAlvo, raio + 10, 'red');
    desenhaCirculo(xAlvo, yAlvo, raio, 'yellow');

    mudaTempo(velocidade());


    function dispara(evento) {

        var x = evento.pageX - tela.offsetLeft;
        var y = evento.pageY - tela.offsetTop;

        console.log("x=" + x + ";" + "y=" + y)

        if ((x > xAlvo - raio) &&
            (x < xAlvo + raio) &&
            (y > yAlvo - raio) &&
            (y < yAlvo + raio)) {

            pontuacao++;

            for (let i = 0; i < jogadores.length; i++) {

                player = {
                    nome: jogadores[i],
                    pontos: pontuacao,
                };

            };

            exibirNaTela();

        }

    }

    tela.onclick = dispara;

};


function mudaTempo(muda) {

    clearInterval(intervalo);
    intervalo = setInterval(atualizaTela, muda * 100);

}

function velocidade() {

    return document.querySelector(".velocidade").value;

}


// -------------------------------------------------------------------------



function nomeJogador() {

    let gamer = document.querySelector("input");
    return gamer.value

}

function adicionarJogador() {

    jogadores.push(nomeJogador());


    for (let i = 0; i < jogadores.length; i++) {

        player = {
            nome: jogadores[i],
            pontos: pontuacao,
        };

        document.querySelector("input").value = "";
    }

    exibirNaTela();
    atualizaTela();

}

let tabelaElemento = document.getElementById("tabelaJogadores");

function exibirNaTela() {

    tabelaElemento.innerHTML = `
        <br>
        <tr>
            <td>${player.nome}</td>
            <br>
            <td>${player.pontos}</td>
        </tr>
        <br>         
  
  `;
}

function adicionarPontos(jogador) {
    jogador.pontos++;
    exibirNaTela();
}

