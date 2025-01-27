let listaDeNumerosSorteados = []; //criando uma lista para armazenar os numeros sorteados
let numeroLimite = 50; //colocando um limite de numeros na lista
let numeroSecreto = gerarNumeroAleatorio(); //usando a função
let tentativas = 1; //criando uma variavel que armazene a quantiade de tenativas

function exibirTextoNaTela(tag, texto) { //criando uma função para exibir o texto em diferentes marcações
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto'); //indicando qual tag é para aparecer o texto
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value; //pegar informação do input para verificar
   
    if(chute == numeroSecreto) { //criando comparações entre o chute e o numeroSecreto
        exibirTextoNaTela('h1', 'Parabéns!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa'; //comparando a quantidade e dependendo do resultado exibirá uma das palavras no texto
        let mensagemTentativas =  `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!` //exibição do texto com indicação para as variaves de comparação retornar o valor correto automaticamente
        exibirTextoNaTela('p', mensagemTentativas); //em caso de acerto essa mensagem sera exibida nas marcações indicadas
        document.getElementById('reiniciar').removeAttribute('disabled'); //após acertar o numero o botão para reiniciar será habilitado
    } else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p','O número secreto é maior'); //caso erre, essa mensagem será exibida apenas na marcação p e o titulo nao altera
        }
        tentativas++; //a cada chute errado a variavel tentativas aumenta
        limparCampo()
    }
}

function gerarNumeroAleatorio() { //função para gerar um numero e retornar um valor
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) { //comparando se os elementos da lista estão iguais ao limite
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); //se o numero escolhido já estiver na lista ele retorna o valor
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //indicando qual parametro sera adicionad ao final da lista
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
    document.getElementById('reiniciar').setAttribute('disabled',true)
}