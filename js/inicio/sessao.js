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

// Verifica e condiciona existência do usuário logado
try {
    var logado = JSON.parse(localStorage[0]).atual
} catch {
    try {
        logado = JSON.parse(localStorage[0]).atual
    } catch {
        localStorage[0] = JSON.stringify({ "atual": null })
        var logado = JSON.parse(localStorage[0]).atual
    }
}

$("#login").attr("href", logado ?
    'index.html' :
    'login.html');


$("#logado").click(function() {
    logout()
});

var exec = logado ? (() => {
    $("#lateral").removeClass("bloqueado")
    $("#login").addClass("logado")
    $("#novidades").removeClass("bloqueado")
    $("#vert-menu-novidades").removeClass("bloqueado")

    array = [solucoes,
        novidades,
        sobre,
        servicos,
        ecommerce,
        clientes,
        contato_e_suporte
    ] = [document.querySelector("#solucoes"),
        document.querySelector("#novidades"),
        document.querySelector("#sobre"),
        document.querySelector("#servicos"),
        document.querySelector("#ecommerce"),
        document.querySelector("#clientes"),
        document.querySelector("#contato-e-suporte")
    ]
    ponto = document.querySelectorAll(".vert-item"); //Array dos pontos do menu 
    linha = document.querySelectorAll(".vert-line"); //Array das linhas do menu 

}) : (() => {
    $("#lateral").addClass("bloqueado")
    $("#login").removeClass("logado")
    $("#novidades").addClass("bloqueado")
    $("#vert-menu-novidades").addClass("bloqueado")

    array = [solucoes,
        sobre,
        servicos,
        ecommerce,
        clientes,
        contato_e_suporte
    ] = [document.querySelector("#solucoes"),
        document.querySelector("#sobre"),
        document.querySelector("#servicos"),
        document.querySelector("#ecommerce"),
        document.querySelector("#clientes"),
        document.querySelector("#contato-e-suporte")
    ]

    ponto = document.querySelectorAll(".static.vert-item"); //Array dos pontos do menu 
    linha = document.querySelectorAll(".static.vert-line"); //Array das linhas do menu 

})
exec()





function logout() {
    localStorage[0] = JSON.stringify({ "atual": null })
    logado = JSON.parse(localStorage[0]).atual
    window.location.reload
}

$("#login").on("click", function() {
    logado ? logout() : false;
});