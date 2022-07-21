// Quando a tela é redimensionada
$(window).resize(function() {
    responsivo()
});


// Função
function responsivo() {
    var mobile = $(window).width() <= 1000 ? true : false;
    // Modificação de valor
    $("#logado").html(
        logado ?
        (mobile ? '<i class="fa-solid fa-sign-out"></i>' : '<i class="fa-solid fa-user"></i>Logout') :
        (mobile ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-user"></i>Login')
    )
    mobile ?
        $("#login").addClass("flex") : $("#login").removeClass("flex");
}

// automaticamente executado
responsivo()