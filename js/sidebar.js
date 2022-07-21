function abrir() {
    $("#lateral").toggleClass("aberto");
    $("#btn_lateral").toggleClass("rodar");

}

$('#mostrar_indices').click(function() {
    $("#indices").toggleClass("hidden");
    $("#side").toggleClass("hidden");
    $("#mostrar_indices").toggleClass("ativado");

});

$('#show_indexes').click(function() {
    $("#indices").toggleClass("hidden");
    $("#side").toggleClass("hidden");
    $("#show_indexes").toggleClass("ativado");

});


function expandir(isso) {
    $(isso).next("ul").find("li").toggleClass("expandido");
}

$("#indices ul b").click(function() {
    $(this).next("ul").toggleClass("expandido");
});
// --------------------------------------------------------> Minimizar

$(".alt").click(function(e) {
    if ($(window).width() <= 900) {
        $("#nav-menu").toggleClass("menu");
    }
});