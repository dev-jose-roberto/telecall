try {
    var darkmode = JSON.parse(localStorage["darkmode"])
    localStorage["darkmode"] = darkmode
} catch {
    try {
        darkmode = JSON.parse(localStorage["darkmode"])
        localStorage["darkmode"] = darkmode
    } catch {
        localStorage["darkmode"] = false
    }
}

darkMode()

$("#mode").click(function(e) {
    e.preventDefault();
    darkmode = !darkmode
    darkMode()
    localStorage["darkmode"] = darkmode
});


function darkMode() {
    if (darkmode) {
        $("#timeline img").attr("src", "img/dark-mode/linha-do-tempo-dark.png")
        $("#dudu").attr("src", "img/dark-mode/dudu-editado-dark.png")
        $("#mode").attr("src", "/img/modelos/dark-mode.svg")
        $("#bordas").attr("src", "img/dark-mode/bordas-dark.png")
        $("body").addClass("dark");
        $("#menus").addClass("dark");
        $("span.obs").addClass("dark");
    } else {
        $("#timeline img").attr("src", "img/inicio/linha-do-tempo.png")
        $("#dudu").attr("src", "img/inicio/dudu-editado.png")
        $("#mode").attr("src", "/img/modelos/light-mode.svg")
        $("#bordas").attr("src", "img/inicio/bordas.png")
        $("body").removeClass("dark");
        $("#menus").removeClass("dark");
        $("span.obs").removeClass("dark");
    }
}