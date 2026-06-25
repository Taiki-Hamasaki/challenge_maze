namespace SpriteKind {
    export const GameInteractions = SpriteKind.create()
}
info.onCountdownEnd(function () {
    game.setGameOverMessage(false, "Seu tempo acabou...\nDerrota")
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.GameInteractions, function (sprite, otherSprite) {
    challenges(sprite, otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
	
})
let frame = false
// 0=baixo, 1=cima, 2=direita, 3=esquerda
let direcao = 0
let stalkingLoop = false
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
let jogador = sprites.create(playerSprites[0], SpriteKind.Player)
let pills = [img`
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
let stalkerEnemy = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......f11111111f.......
    ....8.fd11111111df......
    ...8.8fd18811188df......
    ...8..8d8d1818dd8f......
    ......f88bf888fd88......
    ......fc8cf818fd8f......
    .......fb8811188f.......
    ......fffcdb1bdffff.....
    ....fc111cbfbfc111cf....
    ....f1b1b1ffff1b1b1f....
    ....fbfbffffffbfbfbf....
    .........ffffff.........
    ...........fff..........
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Enemy)
stalkerEnemy.setPosition(-20, -20)
tiles.setCurrentTilemap(tilemap`level0`)
function init(playerX?:number, playerY?:number,
    stalkerEnemyX?: number, stalkerEnemyY?:number) {
    if (playerX === null || playerY === null || playerX === undefined || playerY === undefined) {
        jogador.setPosition(32, 32);

        pause(5000)
        tiles.placeOnTile(stalkerEnemy, tiles.getTileLocation(2, 2));

        if (!stalkingLoop) {
            game.onUpdateInterval(500, () => {
                let caminho = scene.aStar(tiles.locationOfSprite(stalkerEnemy), tiles.locationOfSprite(jogador))
                scene.followPath(stalkerEnemy, caminho, 100)
            });
            stalkingLoop = true;
        }

        info.startCountdown(300);
    }
}
init(null, null);
const challenges: any = (playerSprite: Sprite, gameInteraction: Sprite) => {
    //console.log('Encostou no inimigo')
    if (endgame === gameInteraction) {
        //sprites.destroyAllSpritesOfKind(SpriteKind.GameInteractions);
        game.setGameOverMessage(true, "Parabéns, você saiu do labirinto!");
        game.gameOver(true);
    }

    //else if (enemySprite === endgame) game.gameOver(true);
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
