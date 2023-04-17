import ehUmCPF from "./validaCpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

const camposDoFormulario = document.querySelectorAll('[required]');
const fomrulario = document.querySelector('[data-formulario]');

fomrulario.addEventListener('submit', e => {
    e.preventDefault();

    const listaRespostas = {
        'nome': e.target.elements['nome'].value,
        'email': e.target.elements['email'].value,
        'rg': e.target.elements['rg'].value,
        'cpf': e.target.elements['cpf'].value,
        'aniversario': e.target.elements['aniversario'].value,
    }

    localStorage.setItem('cadastro', JSON.stringify(listaRespostas));

    window.location.href = './abrir-conta-form-2.html';
});

camposDoFormulario.forEach(campo => {
    campo.addEventListener('blur', () => verificaCampo(campo));
    campo.addEventListener('invalid', evento => evento.preventDefault());
});

const tiposErros = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

const mensagens = {};

function camposComMensagens(campo) {
    let mensagem = '';
    mensagens[campo.name] = {
        valueMissing: `O campo de ${campo.name} deve ser preechido.`,
        patternMismatch: `Por favor, preencha o campo de ${campo.name} de forma válida`,
        tooShort: `Preecha com caracteres suficientes`,
    };
    if(campo.name == 'email') {
        mensagens.email.typeMismatch = `Preecha um E-mail válido`;
    }
    if(campo.name == 'cpf') {
        mensagens.cpf.customError = 'O CPF digitado não existe';
    }
    if(campo.name == 'aniversario') {
        mensagens.aniversario.customError = 'Você deve ser maior que 18 anos para se cadastrar.';
    }
    if(campo.nome == 'termos') {
        mensagens.termos.valueMissing = 'Você deve aceitar nossos termos para continuar.';
    }
    tiposErros.forEach(erro =>  {
        if(campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    });
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if(!validadorDeInput) mensagemErro.textContent = mensagem;
    else mensagemErro.textContent = '';
}

function verificaCampo(campo) {
    campo.setCustomValidity('');
    if(campo.name === 'cpf' && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    if(campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }
    camposComMensagens(campo);
}
