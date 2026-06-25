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
let stalkingLoop = false
let tileSize = 16
let jogador = sprites.create(img`
    e e e . . . . e e e . . . . 
    c d d c . . c d d c . . . . 
    c b d d f f d d b c . . . . 
    c 3 b d d b d b 3 c . . . . 
    f b 3 d d d d 3 b f . . . . 
    e d d d d d d d d e . . . . 
    e d f d d d d f d e . b f b 
    f d d f d d f d d f . f d f 
    f b d d b b d d 2 f . f d f 
    . f 2 2 2 2 2 2 b b f f d f 
    . f b d d d d d d b b d b f 
    . f d d d d d b d d f f f . 
    . f d f f f d f f d f . . . 
    . f f . . f f . . f f . . . 
    `, SpriteKind.Player)
controller.moveSprite(jogador, 200, 200)
scene.cameraFollowSprite(jogador)
endgame.setPosition(40 * tileSize - 32, 40 * tileSize - 32)

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
let stalkerEnemy = sprites.create(img`
    ..ff.......cc...
    ..fbff...fcbc...
    ..fbbcfffbbbc...
    ...fbbccbbbc....
    ....fbcbbddc....
    .....fbbddc.....
    .....fcbfc......
    .....fccf.......
    ....ccccf.......
    ...cbccccf......
    ...cdccccf......
    ..cdbcccccf.....
    ..cdccccccf.....
    .cddccccccf.....
    ffddcccbbbcf..ff
    fbfdccbbbbbfffbf
    fbbfcbbbbbbccbbf
    fdbbbbbccbbcbbdc
    fbdbbbbbbcbcbddc
    .fbbbbbccbbccdc.
    .cfc11bbbcbccc..
    .c111111bbbcf...
    .c111c1ffbbf....
    .c11cc1ffbbf....
    .c1c1311bbbf....
    ..f33311bbbf....
    ..f31c11bbbf....
    ...fcc11bbbf....
    ....fc1bbbf.....
    .....fbbcbf.....
    ......fbbf......
    .......fff......
    `, SpriteKind.Enemy)
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
    console.log('Encostou no inimigo')
    if (endgame === gameInteraction) {
        tiles.setCurrentTilemap(tilemap`level1`)
        sprites.destroyAllSpritesOfKind(SpriteKind.GameInteractions);
    }

    //else if (enemySprite === endgame) game.gameOver(true);
}
