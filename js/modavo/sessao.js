$(document).ready(function() {

    try {
        var logado = JSON.parse(localStorage[0]).atual

    } catch {
        logado = JSON.parse(localStorage[0]).atual
    }

    if (logado) {
        $("#usu").html(String(logado) + ' <i class="fa-solid fa-user"></i>');
    } else {
        window.location.assign("404.html")
    }

    $(".desconectar").click(function(e) {
        localStorage[0] = JSON.stringify({ "atual": null })
        logado = JSON.parse(localStorage[0]).atual
    });

});