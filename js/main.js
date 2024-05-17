var inMenu = true
var contadorDialogo = 38
var waiting = false
var contadorLetras = 0
var faseAtual = 0


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
    faseAtual = 1
    function handleClickDialog() {
        if (faseAtual === 1) {
            if (!waiting) {
                if (contadorDialogo === 39) {
                    startSecondPhase()
                } else {
                    avancaDialogo()
                }
            } else {
                waiting = false
                contadorLetras = dialogs[contadorDialogo].length
            }
        } else {
            faseAtual = 2
            dialogo.off('click')
        }
    }
    function animaTextoDialogo() {
        if (waiting) {
            setTimeout(() => {
                textoDialogo.html(dialogs[contadorDialogo].slice(0, contadorLetras))
                contadorLetras++
                if (contadorLetras <= dialogs[contadorDialogo].length) {
                    animaTextoDialogo()
                } else {
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

    const jogo = $('#jogo')

    jogo.append("<div id='dialogoDiv' class='dialogoDiv'></div>");

    const dialogoDiv = $('#dialogoDiv')

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

    function startSecondPhase() {
        let maxEnemies = 1
        dialogoDiv.detach()
        jogo.append("<div id='player' class='player'></div>");
        jogo.append("<div id='vida' class='vida'></div>");
        const player = $('#player')
        const vida = $('#vida')

        player.append("<div id='playerExhaust' class='playerExhaust'></div>")


        const teclasPressionadas = {
            w: false,
            a: false,
            s: false,
            d: false,
            space: false
        }


        $(document).on('keydown', function (e) {
            switch (e.keyCode) {
                case 87:
                    teclasPressionadas.w = true
                    break;
                case 65:
                    teclasPressionadas.a = true
                    break;
                case 83:
                    teclasPressionadas.s = true
                    break;
                case 68:
                    teclasPressionadas.d = true
                    break;
                case 32:
                    teclasPressionadas.space = true
                    break;
                default:
                    break;
            }
        })

        $(document).on('keyup', function (e) {
            switch (e.keyCode) {
                case 87:
                    teclasPressionadas.w = false
                    break;
                case 65:
                    teclasPressionadas.a = false
                    break;
                case 83:
                    teclasPressionadas.s = false
                    break;
                case 68:
                    teclasPressionadas.d = false
                    break;
                case 32:
                    teclasPressionadas.space = false
                    break;
                default:
                    break;
            }
        })

        function controleNave() {

            const velocidadeMovimento = 8
            const playerWidht = parseInt(player.css('width'))
            const playerHeight = parseInt(player.css('height'))
            const max = {
                top: 0,
                bottom: 500 - playerHeight,
                left: 0,
                right: 800 - playerWidht
            }

            if (teclasPressionadas.w) {
                const currentTop = parseInt(player.css('top'))
                if (currentTop - velocidadeMovimento >= max.top) {
                    player.css('top', currentTop - velocidadeMovimento)
                } else {
                    player.css('top', max.top)
                }
            }
            if (teclasPressionadas.s) {
                const currentTop = parseInt(player.css('top'))
                if (currentTop + velocidadeMovimento <= max.bottom) {
                    player.css('top', currentTop + velocidadeMovimento)
                } else {
                    player.css('top', max.bottom)
                }
            }
            if (teclasPressionadas.a) {
                const currentLeft = parseInt(player.css('left'))
                if (currentLeft - velocidadeMovimento >= max.left) {
                    player.css('left', currentLeft - velocidadeMovimento)
                } else {
                    player.css('left', max.left)
                }
            }
            if (teclasPressionadas.d) {
                const currentLeft = parseInt(player.css('left'))
                console.log(currentLeft)
                if (currentLeft + velocidadeMovimento <= max.right) {
                    player.css('left', currentLeft + velocidadeMovimento)
                } else {
                    player.css('left', max.right)
                }
            }

        }

        function criaInimigo() {
            jogo.append("<div id='enemy1' class='enemy1'></div>")
            const enemy = $('#enemy1')
            enemy.css({
                top: `${Math.random() * 500 > 500 ? 500 - enemy.height() : Math.random() * 500}px`,
                left: `${800 - enemy.width()}px`
            })
            console.log(enemy.css('top'))
            enemy.append("<div id='enemy1Exhaust' class='enemy1Exhaust'></div>")
        }

        function criaInimigos() {
            const currentEnemies = $("#enemy1")
            if (currentEnemies.length < maxEnemies) {
                criaInimigo()
            }
        }

        function secondPhase() {
            controleNave()
            criaInimigos()
        }

        setInterval(secondPhase, 30)

    }
}