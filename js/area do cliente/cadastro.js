// Objeto de validação
var valido = {}

// Objeto do cliente
var cliente = {}

// Objeto de sessão
localStorage[0] = JSON.stringify({ "atual": null })


// Objeto de registro
localStorage[1] = JSON.stringify({
    "login": "modavo",
    "senha": "telecall",
    "nome": null,
    "email": null,
    "cpf": null,
    "cpfcnpj": null,
    "mae": null,
    "cep": null,
    "nr": null,
    "logradouro": null,
    "cidade": null,
    "uf": null,
    "nasc": null,
    "sexo": null,
    "tel": null,
    "cel": null
})


// Verifica a validaço geral
function verificar() {
    let autenticado = validar(valido) == true && Object.keys(valido).length

    autenticado ?
        localStorage[String(localStorage.length - 1)] = JSON.stringify({
            "login": $("#reg_login").val(),
            "senha": $("#reg_senha").val(),
            "nome": $("#nome").val(),
            "email": $("#email").val(),
            "cpf": $("#cpf").val(),
            "nome_mae": $("#nome_mae").val(),
            "cep": $("#cep").val(),
            "nr": $("#nr").val(),
            "logradouro": $("#logradouro").val(),
            "cidade": $("#cidade").val(),
            "uf": $("#uf").val(),
            "nasc": $("#nasc").val(),
            "sexo": $("#sexo").val(),
            "tel": $("#tel").val(),
            "cel": $("#cel").val()
        }) : false;

    return autenticado
}


function validar(validado) {
    let erros = []
    for (let index = 0; index < Object.keys(validado).length; index++) {
        const campo = Object.keys(validado)[index];
        erros.push(validado[campo])
    }
    return !erros.includes(false)
}


//____________________________________ NOMES____________________________________
function validar_nome(obj) {
    valido[obj.id] = /^[a-zA-Zà-úÀ-Ú\s]*$/.test(obj.value) &&
        !/\s\s/.test(obj.value) &&
        obj.value.length > 15
}





//____________________________________ EMAIL____________________________________
function validarEmail(obj) {
    valido[obj.id] = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(obj.value)
}





//____________________________________ CPF / CNPJ_____________________________________
function validar_cpfcnpj(obj) {
    valido[obj.id] = unico(obj.value, obj.id) &&
        obj.value.length <= 14 ?
        validarCPF(obj.value) : validarCNPJ(obj.value);
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj == '') return false;
    if (cnpj.length != 14)
        return false;
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;
    return true;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    // Valida 1o digito	
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito	
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}

function formato(v) {
    //Remove tudo o que não é dígito
    v = v.replace(/\D/g, '')
    if (v.length < 12) { //CPF
        //Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, '$1.$2')
            //Coloca um ponto entre o terceiro e o quarto dígitos
            //de novo (para o segundo bloco de números)
        v = v.replace(/(\d{3})(\d)/, '$1.$2')
            //Coloca um hífen entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    } else { //CNPJ
        //Coloca ponto entre o segundo e o terceiro dígitos
        v = v.replace(/^(\d{2})(\d)/, '$1.$2')
            //Coloca ponto entre o quinto e o sexto dígitos
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            //Coloca uma barra entre o oitavo e o nono dígitos
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2')
            //Coloca um hífen depois do bloco de quatro dígitos
        v = v.replace(/(\d{4})(\d)/, '$1-$2')
    }
    return v
}

function mascaraCPF_CNPJ(cpf, funcao) {
    v_obj = cpf
    v_fun = funcao
    setTimeout(() => {
        v_obj.value = v_fun(v_obj.value)
    }, 1);
}





//____________________________________ ENDEREÇO_____________________________________
$("#cep").mask("99999-999")

function validaCep(obj) {
    valido[obj.id] = pesquisacep(obj.value)
    valido[logradouro.id] = valido[obj.id]
    valido[cidade.id] = valido[obj.id]
    valido[uf.id] = valido[obj.id]
    valido[nr.id] = valido[obj.id]
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('logradouro').value = (conteudo.logradouro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
        // Estiliza os campos
        $("#campo_logradouro").addClass("valido");
        $('#campo_logradouro').removeClass("invalido");;
        $("#campo_logradouro .legenda").addClass("reduzido");
        $("#campo_cidade").addClass("valido");
        $('#campo_cidade').removeClass("invalido");;
        $("#campo_cidade .legenda").addClass("reduzido");
        $("#campo_uf").addClass("valido");
        $('#campo_uf').removeClass("invalido");;
        $("#campo_uf .legenda").addClass("reduzido");
    } //end if.
}

function pesquisacep(valor) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep) {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if (validacep.test(cep)) {
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
            return true

        } else {
            //cep é inválido.
            $('#logradouro').val("");
            $('#campo_logradouro').removeClass("valido");;
            $('#campo_logradouro').addClass("invalido");;
            $('#campo_logradouro .legenda').removeClass("reduzido");
            $('#cidade').val("");
            $('#campo_cidade').removeClass("valido");;
            $('#campo_cidade').addClass("invalido");;
            $('#campo_cidade .legenda').removeClass("reduzido");
            $('#uf').val("");
            $('#campo_uf').removeClass("valido");;
            $('#campo_uf').addClass("invalido");;
            $('#campo_uf .legenda').removeClass("reduzido");
            return false
        }
    } //end if.
    else {
        $('#campo_logradouro').removeClass("invalido");;
        $('#campo_cidade').removeClass("invalido");;
        $('#campo_uf').removeClass("invalido");;
        return false
    }
};





//____________________________________ NASCIMENTO_____________________________________


function deMaior(obj) {
    valido[obj.id] = validadata(obj.value)
}

function validadata(data) {
    data = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
    var data_array = data.split("-"); // quebra a data em array
    // para o IE onde será inserido no formato dd/MM/yyyy
    if (data_array[0].length != 4) {
        data = data_array[2] + "-" + data_array[1] + "-" + data_array[0]; // remonto a data no formato yyyy/MM/dd
    }
    // comparo as datas e calculo a idade

    var hoje = new Date();
    var nasc = new Date(data);
    var idade = hoje.getFullYear() - nasc.getFullYear();
    var m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    if (idade < 18) {
        return false;
    }
    if (idade >= 18 && idade <= 60) {
        return true;
    }
    // se for maior que 60 não vai acontecer nada!
    return false;
}





//____________________________________ SEXO_____________________________________
function sx(obj) {
    valido[obj.id] = obj.value > 0
}





//____________________________________ USUARIO_____________________________________
$("#login").mask("SSSSSS");
$("#reg_login").mask("SSSSSS");

function validarLogin(obj) {
    formato = /^[a-zA-Z0-9_.-]*$/.test(obj.value)
    valido[obj.id] = formato && unico(obj.value, obj.id) && obj.value.length == 6
}

function unico(dado, id) {
    let tipo
    for (let index = 0; index < localStorage.length; index++) {
        if (id == 'reg_login') {
            tipo = JSON.parse(localStorage[index]).login
        } else if (id == 'cpf') {
            tipo = JSON.parse(localStorage[index]).cpf
        } else {
            return false
        }
        if (dado === tipo) {
            return false
        } else {
            return true
        }
    }
}





//____________________________________ TELEFONE E CELULAR_____________________________________
$("#tel").mask("(99) 99 9999-9999")
$("#cel").mask("(99) 99 99999-9999")

function validarTelCel(obj) {
    valido[obj.id] = obj.value.length > 12
}





//____________________________________ SENHAS_____________________________________

$("#senha").mask("SSSSSSSS");
$("#reg_senha").mask("SSSSSSSS");
$("#confirma_senha").mask("SSSSSSSS");

function confirma(obj, confirmacao) {

    let condicao = [
        obj.value.length == 8, // [0] tamanho da senha
        confirmacao.value.length == 8, // [1] tamanho da confirmação
        obj.value && confirmacao.value, // [2] preenchimento dos campos
        confirmacao.value === obj.value // [3] igualdade dos campos
    ]

    // Mais de 8 caracteres
    valido[obj.id] = condicao[0]

    // Mais de 8 caracteres e iguais
    valido[confirmacao.id] = condicao[1] && condicao[3]

    // Mais de 8 caracteres e iguais
    if (condicao[2]) {
        if (condicao[3]) {
            $("#confirma_senha").removeClass("invalido");
            $("#confirma_senha").addClass("valido");
        } else {
            $("#confirma_senha").removeClass("valido");
            $("#confirma_senha").addClass("invalido");
        }
    } else {
        $("#confirma_senha").removeClass("valido");
        $("#confirma_senha").removeClass("invalido");
    }
}