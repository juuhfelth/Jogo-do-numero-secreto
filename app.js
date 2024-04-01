//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do numero secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumerosSorteados = [];

let numeroLimite = 10;

let numeroSecreto = gerarNumeroAleatorio();

let tentativas = 1;

function ExibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML =  texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial(){
    ExibirTextoNaTela('h1', 'Jogo do numero secreto');
    ExibirTextoNaTela('p', 'Escolha um numero entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value
    
    if (chute == numeroSecreto) {
        ExibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        ExibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            ExibirTextoNaTela('p','O numero secreto é menor que o chute');
        } else {
            ExibirTextoNaTela('p','O numero secreto é maior que o chute');
        }
        //tentativas = tentativas + 1;
        tentativas++;
        limparCampo();

    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reinciar').setAttribute('disabled', true);
}