// Criando os objetos dos elementos de texto do form
var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var result = document.querySelector('#inputResult')

// Event listeners para os campos do form
nome.addEventListener('focusout', validarNome);
ano.addEventListener('focusout', validarAno);
email.addEventListener('focusout', validarEmail);
senha.addEventListener('focusout', validarSenha);


// Função para validar Nome
function validarNome(e) {
    const regexNome = /^[A-Za-z]{6,}$/;
    if (!e.target.value.trim().match(regexNome) || regexNome.length < 6) {
        nomeHelp.textContent = "Formato de nome inválido";
        nomeHelp.style.color = "red";
    } else {
        nomeHelp.textContent = "";
    }

}

// Função para validar Ano
function validarAno() {
    const regexAno = /^[0-9]{4}$/;
    const anoTrimado = ano.value.trim();
    if (!anoTrimado.match(regexAno)) {
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color = "red";
    } else {        
        if (parseInt(anoTrimado) > 2022) {
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${2022}.`;
            anoHelp.style.color = "red";
        } else if (parseInt(anoTrimado) < 1900) {
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${1900}.`;
            anoHelp.style.color = "red";
        } else {
            anoHelp.textContent = "";
        }
    }
}

// Função para validar Email
function validarEmail() {
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/;
    if (!email.value.trim().match(regexEmail)) {
        emailHelp.textContent = "Formato de email inválido";
        emailHelp.style.color = "red";
    } else {
        emailHelp.textContent = "";
    }

}

// Função para validar Senha
function validarSenha() {
    const regexSenha = /^(?=.*[!@#%&+])(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
    const senhaValor = senha.value.trim();
    const nomeValor = nome.value.trim();
    const anoValor = ano.value.trim();
    const senhaValorMinuscula = senhaValor.toLowerCase();
    
    if (!senhaValor.match(regexSenha) || senhaValor.includes(nomeValor.toLowerCase()) || senhaValor.includes(anoValor) || senhaValor.includes(nomeValor.toUpperCase()) || senhaValor.includes(nomeValor)  || senhaValorMinuscula.includes(nomeValor.toLowerCase()) ) {
        senhaHelp.textContent = "Senha inválida";
        senhaHelp.style.color = "red";
    } else {
        const forcaSenha = calcularForcaSenha(senhaValor);
        senhaHelp.textContent = `Força da senha: ${forcaSenha}`;
        senhaHelp.style.color = "green";
    }

    verificarFormulario();

}

// Função para calcular a força da senha
function calcularForcaSenha(senha) {
    const comprimento = senha.length;
    const possuiEspeciais = (senha.match(/[!@#%&+]/g) || []).length;
    const possuiNumeros = (senha.match(/\d/g) || []).length;
    const possuiMaiusculas = (senha.match(/[A-Z]/g) || []).length;

    if (comprimento > 12 && possuiEspeciais > 1 && possuiNumeros > 1 && possuiMaiusculas > 1) {
        return "forte";
    } else if (comprimento > 8 && possuiEspeciais >= 1 && possuiNumeros >= 1 && possuiMaiusculas >= 1) {
        return "moderada";
    } else if (comprimento >= 6) {
        return "fraca";
    } else {
        return "inválida";
    }

}

// Função para verificar se todos os campos do formulário são válidos
function verificarFormulario() {
    if (nomeHelp.textContent === "" &&
        anoHelp.textContent === "" &&
        emailHelp.textContent === "" &&
        senhaHelp.textContent.startsWith("Força da senha")) {
        result.textContent = "Seus dados foram registrados com sucesso :)";
        result.style.color = "green";
    } else {
        result.textContent = "Seus dados não foram registrados :(";
        result.style.color = "red";
    }
}
