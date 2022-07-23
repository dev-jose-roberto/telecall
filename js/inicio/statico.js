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
    // ---> A rolagem deve levar em consideração o tamaho da seção visível.
    // ---> Quanto maior a distância, mais lenta deve ser a rolagem.
    // ---> O tamanho total pendente da rolagem deve ser proporcional ao tamanho do elemento.
    // ---> Uma variável vai ser usada para nivelar o peso da rolagem.


    if (!mobile) {
        //  Objetos e variáveis de configuração
        let dimensoes = {}, //coordenadas de controle [px]
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
    }
})