$(document).ready(function() {
    mostrar()
});

function mostrar() {
    setTimeout(subir, 600);
}

function subir() {
    $('#loading').css("transform", "translate(0, -100vh)");
    setTimeout(esconder, 600);
}

function esconder() {
    $('#loading').css("display", "none");
}