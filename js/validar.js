// Criando os objetos dos elementos de texto do form
var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var mensagem = document.createElement("div");
document.querySelector("form").appendChild(mensagem);

// Event listeners para os campos do form
nome.addEventListener('focusout', function(e) {
    validarNome(e);
    validarFormulario();
});
ano.addEventListener('focusout', function() {
    validarAno();
    validarFormulario();
});
email.addEventListener('focusout', function() {
    validarEmail();
    validarFormulario();
});
senha.addEventListener('focusout', function() {
    validarSenha();
    validarFormulario();
});

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
    
    if (!senhaValor.match(regexSenha) || senhaValor.includes(nomeValor.toLowerCase()) || senhaValor.includes(anoValor) || senhaValor.includes(nomeValor.toUpperCase()) || senhaValor.includes(nomeValor) || senhaValorMinuscula.includes(nomeValor.toLowerCase())) {
        senhaHelp.textContent = "Senha inválida";
        senhaHelp.style.color = "red";
    } else {
        const forcaSenha = calcularForcaSenha(senhaValor);
        senhaHelp.textContent = `Força da senha: ${forcaSenha}`;
        senhaHelp.style.color = "green";
    }
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

// Função para validar todo o formulário
function validarFormulario() {
    const camposValidos = [
        validarCampo(nome, nomeHelp, /^[A-Za-z]{6,}$/),
        validarCampo(ano, anoHelp, /^[0-9]{4}$/) && ano.value.trim() >= 1900 && ano.value.trim() <= 2022,
        validarCampo(email, emailHelp, /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/),
        validarCampoSenha()
    ];

    if (camposValidos.every(Boolean)) {
        mensagem.textContent = "Seus dados foram registrados";
        mensagem.style.color = "green";
    } else {
        mensagem.textContent = "Seus dados não foram registrados";
        mensagem.style.color = "red";
    }
}

function validarCampo(campo, helpElement, regex) {
    return campo.value.trim().match(regex) && !helpElement.textContent;
}

function validarCampoSenha() {
    const regexSenha = /^(?=.*[!@#%&+])(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
    const senhaValor = senha.value.trim();
    const nomeValor = nome.value.trim();
    const anoValor = ano.value.trim();
    const senhaValorMinuscula = senhaValor.toLowerCase();

    return senhaValor.match(regexSenha) && !senhaValor.includes(nomeValor.toLowerCase()) && !senhaValor.includes(anoValor) && !senhaValor.includes(nomeValor.toUpperCase()) && !senhaValor.includes(nomeValor) && !senhaValorMinuscula.includes(nomeValor.toLowerCase());
}
