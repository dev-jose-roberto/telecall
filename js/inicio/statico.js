$(document).ready(function() {
    // window.scrollTo(0, 1)
    // window.scrollTo(0, 0)
});


let k = 0, //Variável de tamanho da barra [n]
    temp = 0; //Variável ponte do índice i  [n]

// Variável de eventos seccionados
var array, ponto, linha

//Scroll Vertical do site
document.addEventListener("scroll", function() {
    //--------------------------------------------------------------------------------
    // REGRAS DO CÁLCULO DO HEIGHT DO SCROLL ~ by José roberto
    // 
    // ---> A rolagem deve levar em consideração a distância entre os itens.
    // ---> A rolagem deve ser ponderada em relação ao tamanho dessa distância.
    // ---> Quanto maior a distância, mais lenta deve ser a rolagem.
    // ---> O tamanho total pendente da rolagem deve ser proporcional ao tamanho do elemento.
    // ---> Uma variável vai ser usada para nivelar o peso da rolagem.
    // ---> Quanto mais longa a distância, menor vai ser o peso.
    // ---> Uma variável de tamanho vai ser usada no lugar do scrollY

    // RESULTADO:
    // 1. Controle das dimensões dos elementos.
    // 2. Noção de posição central dos elementos.
    // 3. Lógica do cálculo: 
    //  - O scroll marca o elemento atual, o anterior e desmarca o posterior
    //  - O scroll é unilateral, então o mecanismo marca e desmarca diferentemente 
    //  - A proporção de página percorrida é calculada e o peso dela implica 
    //  na velocidade do scroll.
    //  - As margens foram minizadas na vertical para corrigir os bugs.
    //  - Os métodos lógicos foram revistos para corrigir os bugs.
    //
    //                          100% FUNCIONAL E ESTÁVEL.
    //--------------------------------------------------------------------------------
    //  Sequência das secções do site

    //  Objetos e variáveis de configuração
    let dimensoes = {}, //coordenadas de controle [px]
        centros = {}, //coordenadas dos centros [px]
        i = 0, //índice do menu [n]
        h = 55, //altura da linha padrão [px]
        f //Fator proporcional

    //  Eventos que acontecem para todos os elementos do array
    array.forEach(sectionAtual => {
        let {
            top,
            bottom,
            height
        } = sectionAtual.getBoundingClientRect()

        //  Objeto de registro das configurações
        let valor =
            dimensoes[sectionAtual.id] = {
                "yi": top,
                "yf": bottom,
                "altura": height
            }

        // Cálculo das posições durante o scroll
        if (valor.yi <= 3) { //                         Início da secção ultrapassado
            f = (
                (valor.altura - valor.yf) /
                valor.altura //                         Fator ponderado... 
            )
            k = h * f
        }


        if (valor.yf <= 4) { //                 Final da secção foi passado
            ponto[i].classList.add("old") //    Marca o anterior
            i += 1 //                           Aumenta índice do v-menu 
        }

        if (array[0].getBoundingClientRect().top + ($(document).height() - $(window).height()) <= 0) {
            ponto[array.length - 1].classList.add("set") //        Atualiza o indice final
            k = h
            i = array.length - 1
            ponto[i - 1].classList.remove("set") //        Atualiza o indice final
            ponto[i - 1].classList.add("old") //        Atualiza o indice final
        } else {
            ponto[array.length - 1].classList.remove("set") //        Atualiza o indice final
        }

    });

    //-------------- Eventos que acontecem independentemente para todo o scroll ----------//
    // >> Congelamento do estado das linhas
    if (i <= temp) { //   Subindo?
        linha[temp].style.height = 0 + "px"; // Esvazia!
        ponto[temp].classList.remove("old") //  Normaliza marcação!
    } else { // Descendo?
        linha[temp].style.height = h + "px"; // Preenche! 
    }

    // >> Revesamento de estado dos índices 
    linha[i].style.height = k + "px"; //    Altura com fator ponderado
    ponto[temp].classList.remove("set") //  Desmarca o indice anterior
    ponto[i].classList.add("set") //        Atualiza o indice atual
    temp = i //                             Grava a última posição do indice


    // Para debugging
    // console.clear()
    // console.table(dimensoes)
    // console.table(centros)

})