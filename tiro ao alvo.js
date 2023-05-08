
let tela = document.querySelector('canvas');
let pincel = tela.getContext('2d');
let intervalo;
let raio = 10;
let pontuacao;
const jogadores = [];
const points = [];
// let tempoJogo;

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

            exibirNaTela(jogadores, pontuacao)

        }

    }

    tela.onclick = dispara;

};

//----------------------------------------------------------
//   BLoco: altera velocidade alvo

function mudaTempo(muda) {

    clearInterval(intervalo);
    intervalo = setInterval(atualizaTela, muda * 500);

}

function velocidade() {

    return document.querySelector(".range-vel").value;

}



function paraJogo() {

    alert("vc tem 10s para fazer o seu melhor!");
    setTimeout(clearInterval(intervalo), 10000);
}




// -------------------------------------------------------------------------
// Bloco: adiciona jogador e pontos na tela

const gamer = document.querySelector("input");
const tabelaElemento = document.getElementById("tabelaJogadores");


function adicionarJogador(nomePlayer) {

    jogadores.push(nomePlayer);

    if (isNaN(pontuacao) == false) {

        points.push(pontuacao)
    }

    pontuacao = 0;
    exibirNaTela(jogadores, pontuacao);


} // função ativada no botão - HTML

function exibirNaTela(desafiante, pontos) {

    for (let i = 0; i < jogadores.length; i++) {

        desafiante = {
            nome: jogadores[i],
            pontos: pontos,
        };

        document.querySelector("input").value = "";
    }

    tabelaElemento.innerHTML = `
        <br>
        <tr>
            <td>${desafiante.nome}</td>
            <br>
            <td>${desafiante.pontos}</td>
        </tr>

  `;

    atualizaTela();

}

// function adicionarPontos(jogador) {
//     jogador.pontos++;
//     exibirNaTela(jogadores);
// }

