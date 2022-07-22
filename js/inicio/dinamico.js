//---------------------- CAROUSEL --------------------//
// Array para rodízio
var titulos = [],
    i = 0


// Qual idioma?
let idioma = $("#idioma").data("valor"),
    idiomas = {
        "pt-br": [
            "Novidades",
            "Internet",
            "Telefonia",
            "Redes e Infraestrutura",
            "Mobilidade",
            "Eventos",
            "Outras Soluções"
        ],
        "en-us": [
            "News",
            "Internet",
            "Telephony",
            "Networks & Infrastructure",
            "Mobility",
            "Events",
            "Other Solutions"
        ]
    }

titulos = idiomas[idioma]

// Carregamento completo
$(document).ready(function() {
    // Reset
    $("#titulo").html(titulos[i]);
    // listener de eventos
    const c = document.getElementById('frente')
    c.addEventListener('slid.bs.carousel', event => {
        // indice do carousel
        i = $(".carousel-indicators .active").attr("data-bs-slide-to");
        // Correção de exibição
        if (i == 3) {
            if (idioma == "pt-br") {
                $("#titulo").css({
                    "font-size": "2.6rem",
                });
            } else {
                $("#titulo").css({
                    "font-size": "2.3rem",
                });

            }
        } else if (i == 6) {
            $("#titulo").css({
                "font-size": "3.1rem"
            });
        } else {
            $("#titulo").css({
                "font-size": "4rem"
            });
        }
        $("#titulo").html(titulos[i]);
    })
});
//----------------------------------------------------//

let elem = document.getElementsByClassName("oculto"),

    mobile = $(window).width() <= 1000 ? true : false,

    p = mobile ? (4 / 5) : (2 / 3),

    margem = $(window).height() * p;
$(document).scroll(function() {

    for (let index = 0; index < elem.length; index++) {
        const cliente = elem[index];
        let ini = cliente.getBoundingClientRect().top

        if (ini < margem) {
            cliente.classList.add("visivel")
        } else {
            cliente.classList.remove("visivel")
        }

    }

});