// Animação do fade slide dos elementos 
$(document).scroll(function() {
    let elem = document.getElementsByClassName("oculto")
    let margem = $(window).height() * 4 / 5;

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