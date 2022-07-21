function validaUsuario(obj) {
    formato = /^[a-zA-Z0-9_.-]*$/.test(obj.value)
    valido[obj.id] = formato && obj.value.length == 6
    obj.value.length < 1 ?
        $(obj).removeClass("valido").removeClass("invalido") : ''
}

function validaSenha(obj) {
    valido[obj.id] = obj.value.length == 8
    obj.value.length < 1 ?
        $(obj).removeClass("valido").removeClass("invalido") : ''
}

function sessao(login, senha) {
    if (valido["login"] && valido["senha"]) {
        for (let index = 0; index <= localStorage.length - 1; index++) {
            let l = JSON.parse(localStorage[String(index)]).login; //Login salvos
            let s = JSON.parse(localStorage[String(index)]).senha; //Senha salvos


            if (l == login.value && s == senha.value) {
                localStorage[0] = JSON.stringify({ "atual": l })
                window.location.assign("index.html")
            }
        }
    }
}

$("#form-login").submit(function(e) {
    e.preventDefault();
});