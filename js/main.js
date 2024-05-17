var inMenu = true
var contadorDialogo = 0
var waiting = false
var contadorLetras = 0


function mainMenu() {
    setTimeout(() => {
        $('#comecar span').fadeToggle('fast')
        setTimeout(() => {
            $('#comecar span').fadeToggle('fast')
            inMenu && mainMenu()
        }, 1000);
    }, 1000);
}

function start() {


    function handleClickDialog() {
        if (!waiting) {
            avancaDialogo()
        } else {
            waiting = false
            contadorLetras = dialogs[contadorDialogo].length
        }
    }
    function animaTextoDialogo() {
        if (waiting) {
            setTimeout(() => {
                textoDialogo.html(dialogs[contadorDialogo].slice(0, contadorLetras))
                contadorLetras++
                if (contadorLetras <= dialogs[contadorDialogo].length) {
                    animaTextoDialogo()
                }else{
                    waiting = false
                    contadorLetras = 0
                    contadorDialogo++
                }
            }, 50)
        }
    }


    function avancaDialogo() {
        waiting = true
        var dialogosMark = [1, 18, , 20, 21, 22, 23, 24, 25, 30, 31, 36, 37, 38]

        if (dialogosMark.includes(contadorDialogo)) {
            characterName.html('Mark')
            characterPotrait.css('background-image', 'url(./img/portraits/mark/neutral.webp)')
            characterPotrait.css('background-position-x', 50)
        } else {
            characterName.html('Maria')
            characterPotrait.css('background-image', 'url(./img/portraits/maria/neutral.webp)')
            characterPotrait.css('background-position-x', '')
        }
        animaTextoDialogo()
    }
    inMenu = false
    $('#comecar').hide()

    jogo = $('#jogo')

    jogo.append("<div id='player' class='player'></div>");
    jogo.append("<div id='dialogoDiv' class='dialogoDiv'></div>");
    jogo.append("<div id='nave' class='nave'></div>");
    jogo.append("<div id='vida' class='vida'></div>");

    const player = $('#player')
    const dialogoDiv = $('#dialogoDiv')
    const nave = $('#nave')
    const vida = $('#vida')

    dialogoDiv.append("<div id='characterPortrait' class='characterPortrait'></div>")
    dialogoDiv.append("<div id='dialogo' class='dialogo'></div>")

    const dialogo = $('#dialogo')

    dialogo.append("<span id='textoDialogo' class='textoDialogo'></span>")
    dialogo.append("<span id='characterName' class='characterName'></span>")

    const characterPotrait = $('#characterPortrait')
    const characterName = $('#characterName')
    const textoDialogo = $('#textoDialogo')

    dialogo.on('click', handleClickDialog)

    characterName.html('Maria')
    avancaDialogo()

}