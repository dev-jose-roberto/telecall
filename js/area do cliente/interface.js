// ///////////////////////////////////////////////////////////////  Ações do formulário de login
// ____________________________________ Apagar campos
function limpar(obj) {
    $(obj).next().next(".campo").val(null);
    $(obj).next().next(".campo").focus();
    setTimeout(() => {
        $(obj).parent().removeClass("valido");
        $(obj).parent().removeClass("invalido");
    }, 1000);
}


//____________________________________ mostrar senha
$("#mostrar-senha").on("click", function() {

    let alterar = $("#senha").attr("type") == "password" ? true : false;

    $("#senha").attr(
        "type",
        alterar ?
        'text' : 'password'
    );

    alterar ?
        $("#mostrar-senha").removeClass("fa-solid fa-eye").addClass("fa-solid fa-eye-slash") :
        $("#mostrar-senha").removeClass("fa-solid fa-eye-slash").addClass("fa-solid fa-eye")

});

//________________Limpar tudo
function resetar() {
    $(".campo").parent().removeClass("invalido")
    $(".campo").parent().removeClass('valido');
}



///////////////////////////////////////////////////////////////// Interação dos inputs
//____________________________________ Exibição dos botões de apagar
function icoLogin() {
    document.getElementById('limpar-login').style.display = $("#login").val() ?
        'flex' : 'none';
}

function icoSenha() {
    document.getElementById('limpar-senha').style.display = $("#senha").val() ?
        'flex' : 'none';

    document.getElementById('mostrar-senha').style.display = $("#senha").val() ?
        'flex' : 'none';
}

//____________________________________ Ao clicar no ícone
$(".icone").click(function() {
    $(this).next(".campo").focus()
});





////////////////////////////////////////////////////////////////// Animação das labels

//____________________________________ Ao digitar
$(".campo").on("input", function() {
    !$(this).val() ?
        $(this).next().next("label.legenda").removeClass("reduzido") : $(this).next().next("label.legenda").addClass("reduzido");
});

//____________________________________ Ao clicar
$(".campo").focus(function() {
    !$(this).val() ?
        $(this).next().next("label.legenda").addClass("reduzido") : '';
});

//____________________________________ Ao sair
$(".campo").blur(function() {
    !$(this).val() ?
        $(this).next().next("label.legenda").removeClass("reduzido") : '';
});




// ///////////////////////////////////////////////////////////////  Estilização pós validação
// ao digitar
$('.campo').on('input', function() {
    if (this.value) {
        if (valido[this.id]) {
            $(this).parent().removeClass('invalido')
            $(this).parent().addClass('valido')
        } else {
            $(this).parent().removeClass('valido')
            $(this).parent().addClass('invalido')
        }
    } else {
        $(this).parent().removeClass('invalido');
        $(this).parent().removeClass('valido');
    }
});

$('.campo').on('change', function() {
    if (this.value > 0 || this.value != "yyyy-mm-dd") {
        if (valido[this.id]) {
            $(this).parent().removeClass('invalido')
            $(this).parent().addClass('valido')
        } else {
            $(this).parent().removeClass('valido')
            $(this).parent().addClass('invalido')
        }
    } else {
        $(this).parent().removeClass('invalido');
        $(this).parent().removeClass('valido');
    }
});

$('.campo').blur(function() {
    if (!mobile && this.value) {
        !valido[this.id] ?
            $(this).next(".alerta").removeClass('oculto') : '';

        setTimeout(() => { $(this).next(".alerta").addClass('oculto') }, 4000);
    } else {
        $(this).parent().removeClass("invalido")
        $(this).parent().removeClass("valido")
    }

});










////////////////////////////////////////////////////////////////// Responsividades
// ____________________________Quando a tela é redimensionada
$(window).resize(function() {
    responsivo()
});

// ____________________________Função
var mobile

function responsivo() {
    mobile = $(window).width() <= 1000 ? true : false;
    //________________________ Modificação de valor
    $("#voltar").html(
        mobile ?
        '<i class="fas fa-arrow-alt-left"></i>' : '<i class="fas fa-arrow-alt-left"></i>Início'
    );
}

//_____________________________ automaticamente executado
responsivo()












// //////////////////////////////////////////////////////////////// Transições entre telas
let cadastrando
$(".form-btn.cadastro").on("click", function(e) {
    cadastrando = $(".sessao").hasClass("oculto")
    e.preventDefault();

    if ((!cadastrando) || verificar()) {
        $(".sessao").toggleClass("oculto");
        $(".registro").toggleClass("oculto");


        if (cadastrando && !mobile) {
            $("#voltar").html('<i class="fas fa-arrow-alt-left"></i>Voltar');
        } else {
            $("#voltar").html('<i class="fas fa-arrow-alt-left"></i>Inicio');
        }
    }
});


$(".form-btn.limpar").on("click", function() {
    $(".dados .campo").val("");
    $(".dados .legenda").removeClass("reduzido");
});

$("#voltar").on("click", function() {
    cadastrando = $(".sessao").hasClass("oculto")

    cadastrando ?
        $("#voltar").attr("href", "#") :
        $("#voltar").attr("href", "index.html");

    if (cadastrando) {
        $(".sessao").toggleClass("oculto");
        $(".registro").toggleClass("oculto");
    }
});