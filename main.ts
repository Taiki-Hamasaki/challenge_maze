namespace SpriteKind {
    export const GameInteractions = SpriteKind.create()
    export const PowerUps = SpriteKind.create()
}

game.splash('Bem vindo aos labirintos dos desafios', 'Você tem 2min para sair daqui,\ntem uns cara falando de programação aí no meio, cuidado...')

sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUps, function (sprite, otherSprite) {
    if (otherSprite.image == pills[0]) {
        sprites.destroy(otherSprite, effects.spray)
        info.changeCountdownBy(10)
    } else if (otherSprite.image == pills[1]) {
        sprites.destroy(otherSprite, effects.spray)
        sprite.setVelocity(400, 400)
        pause(8000)
    } else if (otherSprite.image == pills[2]) {
        sprites.destroy(otherSprite, effects.spray)
        sprite.setImage(sprite.image.rotated(180))
        controller.moveSprite(sprite, -200, -200)
        pause(30000)
    }
    controller.moveSprite(sprite, 200, 200)
})
let enemy2: any, enemy3: any;
enemy2 = sprites.create(img`
    ..............aa...............
    ............aaaaaa.............
    ..........aaaaaaaaaa...........
    ........aaaaaaaaaaaaaa.........
    ......baaaaaaaaaaaaaaaab.......
    ....daaaaaaaab..baaaaaaaad.....
    ...aaaaaaa..........aaaaaaad...
    .aaaaaaab............daaaaaaa..
    aaaaaaa................aaaaa88.
    aaaaaad................daa8888.
    aaaaaa..................888888.
    aaaa........aaaaaa.....8888888.
    aaaa.......aaaaaaaa..888888888.
    aaaa......aaaaaaaaa88888888888.
    aaaa......aaaaaaa8888888888888.
    aaaa......aaaaa888888888888888.
    aaaa......aaaa8888888888888888.
    aaaa......aa888888888888888888.
    aaaad.....88888888888888888888.
    aaaaa......88888888..888888888.
    aaaaa.......888888.....8888888.
    aaaaa8..................888888.
    aaa888d................d888888.
    a888888d...............8888888.
    .8888888b............b8888888..
    ...8888888..........8888888....
    .....88888888bddb88888888d.....
    ......b8888888888888888b.......
    ........88888888888888.........
    ..........8888888888...........
    ............888888.............
    ..............88...............
`, SpriteKind.Enemy)
enemy3 = sprites.create(img`
    ................................
    .................d..............
    ................................
    .................23.............
    ................22..............
    ...............222..............
    .............2222....42.........
    ...........32222..222...........
    ..........22223.222d............
    .........2222...22..............
    .........222...222..............
    .........222...222..............
    ..........22...d222.............
    ...........22...d22.............
    ............2....22.............
    .........d.......24......d......
    ...6888...............d..688....
    ...888888888888888888.....88....
    .......b666666............88....
    .......8d................888....
    .......88888888888888...889.....
    ..........666666.......6........
    .......688.....d888.............
    ..8888.6888888888888............
    8888............................
    68888..................9886.....
    ..6888888888888888888888d....8..
    .......d9888888886d........88...
    ......8...............98888.....
    ...........688888888869.........
    ................................
    ................................
`, SpriteKind.Enemy)
function initInteractions() {
    x = [1, 8, 11, 5, 15, 15, 24, 28, 5]
    y = [17, 24, 1, 9, 1, 34, 1, 24, 33]
    for (let i = 0; i <= 8; i++) {
        let powerUp: any;
        if (i < 3) {
            powerUp = sprites.create(pills[0], SpriteKind.PowerUps)
        } else if (i >= 3 && i <= 5) {
            powerUp = sprites.create(pills[1], SpriteKind.PowerUps)
        } else {
            powerUp = sprites.create(pills[2], SpriteKind.PowerUps)
        }
        tiles.placeOnTile(powerUp, tiles.getTileLocation(x[i], y[i]))
    }
    tiles.placeOnTile(enemy2, tiles.getTileLocation(12, 24))
    tiles.placeOnTile(enemy3, tiles.getTileLocation(33, 14))

}
info.onCountdownEnd(function () {
    game.setGameOverMessage(false, "Seu tempo acabou...\nDerrota")
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.GameInteractions, function (sprite, otherSprite) {
    if (endgame === otherSprite) {
        game.setGameOverMessage(true, "Parabéns, você saiu do labirinto!");
        game.gameOver(true);
    }
})
// Quiz dos questionadores
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    let perguntas: Database.Pergunta[];
    let rand: number;
    lastX = jogador.x
    lastY = jogador.y
    controller.moveSprite(sprite, 0, 0)
    if (otherSprite == stalkerEnemy) {
        remainingTime = info.countdown()
        info.stopCountdown()
        perguntas = Database.perguntasStalker;
        rand = Math.floor(Math.random() * perguntas.length)
        story.spriteSayText(otherSprite, perguntas[rand].quiz)
        let alternatives = perguntas[rand].alternativas;
        story.showPlayerChoices(alternatives[0], alternatives[1], alternatives[2])
        resposta = story.getLastAnswer()
        if (resposta == perguntas[rand].alternativas[perguntas[rand].resposta]) {
            story.spriteSayText(otherSprite, "Droga, você colou, certeza...")
            controller.moveSprite(jogador, 200, 200)
            otherSprite.setPosition(-20, -20)
            pause(5000)
            otherSprite.setPosition(lastX, lastY)
        } else {
            story.spriteSayText(otherSprite, "HAHAHA, você errou! Melhor voltar para o início do labirinto!")
            controller.moveSprite(jogador, 200, 200)
            init(32, 32, 2, 2);
        }
        info.startCountdown(remainingTime)
    } else {
        stalkingLoop = false;
        stalkerEnemy.vx = 0
        stalkerEnemy.vy = 0
        
        if (otherSprite == enemy2) {
            perguntas = Database.perguntasC;
            rand = Math.floor(Math.random() * perguntas.length)
        } else if (otherSprite == enemy3) {
            perguntas = Database.perguntasPOO;
            rand = Math.floor(Math.random() * perguntas.length)
        }

        story.spriteSayText(otherSprite, perguntas[rand].quiz)
        let alternatives = perguntas[rand].alternativas;
        story.showPlayerChoices(alternatives[0], alternatives[1], alternatives[2])
        resposta = story.getLastAnswer()

        if (resposta == perguntas[rand].alternativas[perguntas[rand].resposta]) {
            story.spriteSayText(otherSprite, "Parabéns, entrada liberada!")
        } else {
            story.spriteSayText(otherSprite, "Que pena, você errou...\nBoa sorte pra sair daqui com menos tempo")
            info.changeCountdownBy(-40)
        }
        controller.moveSprite(jogador, 200, 200)
        sprites.destroy(otherSprite)

        stalkingLoop = true;
    }
})
let lastY = 0
let lastX = 0
let remainingTime = 0
let y: number[] = []
let x: number[] = []
let time = 0
let pills: Image[] = []
let frame = false
// 0=baixo, 1=cima, 2=direita, 3=esquerda
let direcao = 0
let stalkingLoop = true
let jogador: Sprite = null
let stalkerEnemy: Sprite = null
let resposta = ""
let powerUp2 = null

// 0,3 - parado
// 1,2,4,5 - andando
let playerSprites = [
    img`
    . . . . f f f f . . . . . 
    . . f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f f f c c f f f c . 
    f f f c f f f f f f f c . 
    c c c f f f e e f f c c . 
    f f f f f e e f f c c f . 
    f f f b f e e f b f f f . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f e 4 4 4 4 4 4 e f . . 
    . f f f e e e e f f f . . 
    f e f b 7 7 7 7 b f e f . 
    e 4 f 7 7 7 7 7 7 f 4 e . 
    e e f 6 6 6 6 6 6 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `,
    img`
    . . . . . . . . . . . . . 
    . . . . . f f f f . . . . 
    . . . f f f f f f f f . . 
    . . f f f f f f c f f f . 
    f f f f f f f c c f f f c 
    f f f f c f f f f f f f c 
    . c c c f f f e e f f c c 
    . f f f f f e e f f c c f 
    . f f f b f e e f b f f f 
    . f f 4 1 f 4 4 f 1 4 f f 
    . . f e 4 4 4 4 4 e e f e 
    . f e f b 7 7 7 e 4 4 4 e 
    . e 4 f 7 7 7 7 e 4 4 e . 
    . . . f 6 6 6 6 6 e e . . 
    . . . f f f f f f f . . . 
    . . . f f f . . . . . . . 
    `,
    img`
    . . . . . . . . . . . . . 
    . . . . f f f f . . . . . 
    . . f f f f f f f f . . . 
    . f f f c f f f f f f . . 
    c f f f c c f f f f f f f 
    c f f f f f f f c f f f f 
    c c f f e e f f f c c c . 
    f c c f f e e f f f f f . 
    f f f b f e e f b f f f . 
    f f 4 1 f 4 4 f 1 4 f f . 
    e f e e 4 4 4 4 4 e f . . 
    e 4 4 4 e 7 7 7 b f e f . 
    . e 4 4 e 7 7 7 7 f 4 e . 
    . . e e 6 6 6 6 6 f . . . 
    . . . f f f f f f f . . . 
    . . . . . . . f f f . . . 
    `,
    img`
    . . . . f f f f . . . . . 
    . . f f c c c c f f . . . 
    . f f c c c c c c f f . . 
    f f c c c c c c c c f f . 
    f f c c f c c c c c c f . 
    f f f f f c c c f c c f . 
    f f f f c c c f c c f f . 
    f f f f f f f f f f f f . 
    f f f f f f f f f f f f . 
    . f f f f f f f f f f . . 
    . f f f f f f f f f f . . 
    f e f f f f f f f f e f . 
    e 4 f 7 7 7 7 7 7 c 4 e . 
    e e f 6 6 6 6 6 6 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `,
    img`
    . . . . . . . . . . . . . 
    . . . . . f f f f . . . . 
    . . . f f c c c c f f . . 
    . f f f c c c c c c f f . 
    f f c c c c c c c c c f f 
    f c c c c f c c c c c c f 
    . f f f f c c c c f c c f 
    . f f f f c c f c c c f f 
    . f f f f f f f f f f f f 
    . f f f f f f f f f f f f 
    . . f f f f f f f f f f . 
    . . e f f f f f f f f f . 
    . . e f f f f f f f f e f 
    . . 4 c 7 7 7 7 7 e 4 4 e 
    . . e f f f f f f f e e . 
    . . . f f f . . . . . . . 
    `,
    img`
    . . . . . . . . . . . . . 
    . . . . . f f f f . . . . 
    . . . f f c c c c f f . . 
    . . f f c c c c c c f f . 
    . f f f c c c c c c c f f 
    f f f c c c c c c c c c f 
    f f c c c f c c c c c c f 
    . f f f f f c c c f c f f 
    . f f f f c c f f c f f f 
    . . f f f f f f f f f f f 
    . . f f f f f f f f f f . 
    . . f f f f f f f f f e . 
    . f e f f f f f f f f e . 
    . e 4 4 e 7 7 7 7 7 c 4 . 
    . . e e f f f f f f f e . 
    . . . . . . . . f f f . . 
    `,
    img`
    . . . . . f f f f f . . . 
    . . . f f f f f f f f f . 
    . . f f f c f f f f f f . 
    . . f f c f f f c f f f f 
    f f c c f f f c c f f c f 
    f f f f f e f f f f c c f 
    . f f f e e f f f f f f f 
    . . f f e e f b f e e f f 
    . . . f 4 4 f 1 e 4 e f . 
    . . . f 4 4 4 4 e f f f . 
    . . . f f e e e e e f . . 
    . . . f 7 7 7 e 4 4 e . . 
    . . . f 7 7 7 e 4 4 e . . 
    . . . f 6 6 6 f e e f . . 
    . . . . f f f f f f . . . 
    . . . . . . f f f . . . . 
    `,
    img`
    . . . . . . . . . . . . . 
    . . . . f f f f f f . . . 
    . . . f f f f f f f f f . 
    . . f f f c f f f f f f . 
    . f f f c f f f c f f f f 
    f f c c f f f c c f f c f 
    f f f f f e f f f f c c f 
    . f f f e e f f f f f f f 
    . . f f e e f b f e e f f 
    . . f f 4 4 f 1 e 4 e f . 
    . . . f 4 4 4 e e f f f . 
    . . . f f e e 4 4 e f . . 
    . . . f 7 7 e 4 4 e f . . 
    . . f f 6 6 f e e f f f . 
    . . f f f f f f f f f f . 
    . . . f f f . . . f f . . 
    `,
    img`
    . . . f f f f f . . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f . . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f . . 
    . f e 4 e 1 f 4 4 f . . . 
    . f f f e 4 4 4 4 f . . . 
    . . f e e e e e f f . . . 
    . . e 4 4 e 7 7 7 f . . . 
    . . e 4 4 e 7 7 7 f . . . 
    . . f e e f 6 6 6 f . . . 
    . . . f f f f f f . . . . 
    . . . . f f f . . . . . . 
    `,
    img`
    . . . . . . . . . . . . . 
    . . . f f f f f f . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f f . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f . . 
    . f e 4 e 1 f 4 4 f f . . 
    . f f f e e 4 4 4 f . . . 
    . . f e 4 4 e e f f . . . 
    . . f e 4 4 e 7 7 f . . . 
    . f f f e e f 6 6 f f . . 
    . f f f f f f f f f f . . 
    . . f f . . . f f f . . . 
    `
]
let tileSize = 16
jogador = sprites.create(playerSprites[0], SpriteKind.Player)
pills = [img`
    . . 7 7 7 7 7 7 . . . . . . . . 
    . . 7 . . f f f f f . . . . . . 
    . . 7 . f . . . . . f . . . . . 
    . . 7 f . . . 8 . . . f . . . . 
    . . 7 7 7 7 . 8 . . . . f . . . 
    . f 7 . . . . 8 . . . . . f . . 
    . f 7 . . . . 8 . . . . . f . . 
    . f 7 . . . . f 2 2 . . . f . . 
    . f 7 7 7 7 7 7 . 7 . . . f . 7 
    . f . . . . . . . . 7 . . f 7 . 
    . . f . . . . . . . . 7 f 7 . . 
    . . . f . . . . . . . f 7 . . . 
    . . . . f . . . . . f 7 . 7 . . 
    . . . . . f f f f f 7 . . . 7 . 
    . . . . . . . . . 7 . . . . . 7 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . f f f f f f f f . . . . 
    . . . . f 5 5 5 5 5 5 f . . . . 
    . . . f f 5 5 5 5 5 5 f . . . . 
    . . . f 5 5 5 5 5 5 f . . . . . 
    . . . f 5 5 5 5 5 f . . . . . . 
    . . f f 5 5 5 5 f f f f f f f . 
    . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
    . . f 5 5 5 5 5 5 5 5 5 5 f . . 
    . . . f f f f f f 5 5 f f . . . 
    . . . . . . f f 5 5 f f . . . . 
    . . . . . f f 5 5 f f . . . . . 
    . . . . f f 5 5 f f . . . . . . 
    . . . . f 5 5 f f . . . . . . . 
    . . . f f 5 f f . . . . . . . . 
    . . . f 5 f f . . . . . . . . . 
    . . . f f f . . . . . . . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . f f . . . f f f . . . . . . . 
    . f . f . f 8 8 8 8 . . . . . . 
    . f . . f f 8 8 8 8 8 . . . . . 
    . f . . f f . . . f 8 8 . . . . 
    . f . f 8 f . . . f . 8 . . . . 
    . f f 8 . . f f f 8 8 8 8 8 . . 
    . . . . . . . . . . 8 8 8 . . . 
    . . . 8 . . . . . . . 8 . . . . 
    . . 8 8 8 . . . . . . . . . . . 
    . 8 f 8 8 8 f . f f . f f f f f 
    . . f f . . f f . . f 8 . f . . 
    . . f 8 f . f f . 8 f . . f . . 
    . . f . 8 f f f 8 8 f . . f . . 
    . . f . . 8 f 8 f f . . . f . . 
    . . . . . . . . . . . . . . . . 
    `]
controller.moveSprite(jogador, 200, 200)
scene.cameraFollowSprite(jogador)
let endgame = sprites.create(img`
    ....................
    .ffff..f....f.fff...
    .f.....ff...f.f..f..
    .f.....fff..f.f...f.
    .fff...f.ff.f.f...f.
    .f.....f..fff.f...f.
    .f.....f...ff.f..f..
    .ffff..f....f.fff...
    ....................
    ....................
    ....................
    ffff..f..f.....f.fff
    f....f.f.ff...ff.f..
    f....f.f.f.f.f.f.f..
    f....fff.f..f..f.fff
    f.ff.f.f.f.....f.f..
    f..f.f.f.f.....f.f..
    ffff.f.f.f.....f.fff
    ....................
    ....................
    `, SpriteKind.GameInteractions)
endgame.setPosition(40 * tileSize - 32, 40 * tileSize - 32)
stalkerEnemy = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . 5 5 5 5 5 5 5 5 . . . . 
    . . . 5 5 f 5 5 5 5 f 5 5 . . . 
    . . 5 f f f 5 5 5 5 f f f 5 . . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 5 5 1 f f 2 2 2 2 1 f 5 5 5 2 
    2 5 5 5 f f 2 2 2 2 f f 5 5 5 2 
    . 2 5 5 f f 2 2 2 2 f f 5 5 2 . 
    . 2 2 2 2 2 2 5 5 2 2 2 2 2 2 . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    . 5 5 5 f 1 1 1 1 1 f 5 5 5 5 . 
    . . 5 5 f 1 1 1 1 1 f 5 5 5 . . 
    . . . 5 5 1 1 1 1 1 5 5 5 . . . 
    . . . . 5 5 5 5 5 5 5 5 . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Enemy)
stalkerEnemy.setPosition(-20, -20)
tiles.setCurrentTilemap(tilemap`level0`)
function init(playerX?: number, playerY?: number,
    stalkerEnemyX?: number, stalkerEnemyY?: number) {
    if (playerX === undefined || playerY === undefined || stalkerEnemyX === undefined || stalkerEnemyY === undefined) {
        jogador.setPosition(32, 32);

        pause(5000)
        tiles.placeOnTile(stalkerEnemy, tiles.getTileLocation(2, 2));

        game.onUpdateInterval(1500, () => {
            if(stalkingLoop) {
                let caminho = scene.aStar(tiles.locationOfSprite(stalkerEnemy), tiles.locationOfSprite(jogador));
                scene.followPath(stalkerEnemy,
                    caminho === undefined ? [] : caminho, 100)
            }
        });
        info.startCountdown(120);
    } else {
        jogador.setPosition(playerX, playerY);
        stalkerEnemy.setPosition(-20, -20);
        pause(5000)
        tiles.placeOnTile(stalkerEnemy, tiles.getTileLocation
            (stalkerEnemyX === undefined ? 2 : stalkerEnemyX, stalkerEnemyY === undefined ? 2 : stalkerEnemyY));
        info.startCountdown(info.countdown());
    }
}

game.onUpdate(function () {
    // Atualiza direção
    if (Math.abs(jogador.vx) > Math.abs(jogador.vy)) {
        if (jogador.vx > 0) {
            direcao = 3
        } else if (jogador.vx < 0) {
            direcao = 2
        }
    } else {
        if (jogador.vy > 0) {
            direcao = 0
        } else if (jogador.vy < 0) {
            direcao = 1
        }
    }
    // Sprite parado
    if (jogador.vx == 0 && jogador.vy == 0) {
        switch (direcao) {
            case 0:
                jogador.setImage(playerSprites[0])
                break

            case 1:
                jogador.setImage(playerSprites[3])
                break

            case 2:
                jogador.setImage(playerSprites[6])
                break

            case 3:
                jogador.setImage(playerSprites[8])
                break
        }
    }
})
game.onUpdateInterval(150, function () {
    if (jogador.vx == 0 && jogador.vy == 0) {
        return
    }
    frame = !(frame)
    switch (direcao) {
        case 0:
            jogador.setImage(playerSprites[frame ? 1 : 2])
            break

        case 1:
            jogador.setImage(playerSprites[frame ? 4 : 5])
            break

        case 2:
            jogador.setImage(playerSprites[7])
            break

        case 3:
            jogador.setImage(playerSprites[9])
            break
    }
})
initInteractions()
init(undefined, undefined, undefined, undefined);
