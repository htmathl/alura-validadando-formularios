export default function ehUmCPF(campo) {
    const cpf = campo.value.replace(/\.|-/g, "");
    // if(validaNumerosMenorQueOnze(cpf)) {
    //     campo.setCustomValidity('Muitos números, inviável');
    //     return;
    // }
    if(validaNumerosRepetidos(cpf) || validarPrimeitoDigito(cpf) || validarSegundoDigito(cpf)) {
        campo.setCustomValidity('Esse CPF não existe!');
        return;
    }
    console.log('Existe!');
}

// function validaNumerosMenorQueOnze(cpf) {
//     return cpf.split('').length > 11 && !Number.isNaN(cpf);
// }

function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [ 
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
    ];

    return numerosRepetidos.includes(cpf);
}

function validarPrimeitoDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    for(let tam = 0; tam < 9; tam++) {
        soma += cpf[tam] * multiplicador;
        multiplicador --;
    }

    soma = (soma * 10) % 11;

    if(soma === 10 || soma === 1)soma = 0;

    return soma != cpf[9];
}

function validarSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for(let tam = 0; tam < 10; tam++) {
        soma += cpf[tam] * multiplicador;
        multiplicador --;
    }

    soma = (soma * 10) % 11;

    if(soma === 10 || soma === 1) soma = 0;

    return soma != cpf[10];
}
