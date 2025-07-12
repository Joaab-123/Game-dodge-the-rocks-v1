//  Splash screen
game.splash("🌩 DODGE THE ROCKS 🌩", "Move ← → to survive")
scene.setBackgroundColor(9)
//  Player sprite
let hero = sprites.create(img`
    . . . . . f f f f . . . . .
    . . . f f f 2 2 f f f . . .
    . . f f f 2 2 2 2 f f f . .
    . f f f e e e e e e f f f .
    . f f e 2 2 2 2 2 2 e e f .
    . f e 2 f f f f f f 2 e f .
    . f f f f e e e e f f f f .
    f f e f b f 4 4 f b f e f f
    f e e 4 1 f d d f 1 4 e e f
    . f e e d d d d d d e e f .
    . . f e e 4 4 4 4 e e f . .
    . . . f f e e e e f f . . .
    . . . . f f f f f f . . . .
`, SpriteKind.Player)
controller.moveSprite(hero, 100, 0)
hero.setStayInScreen(true)
hero.setPosition(80, 100)
//  Game state
info.setLife(3)
info.setScore(0)
//  === FUNCTIONS === #
//  === EVENTS === #
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_hit(hero: Sprite, rock: Sprite) {
    rock.destroy(effects.fire, 100)
    info.changeLifeBy(-1)
    scene.cameraShake(4, 200)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function on_collect(hero: Sprite, heart: Sprite) {
    heart.destroy(effects.hearts, 100)
    info.changeLifeBy(1)
})
//  === TIMED EVENTS === #
let speed_boost = 0
//  Enemies drop regularly
game.onUpdateInterval(1000, function spawn_rock() {
    let rock = sprites.create(img`
        . . . . b b b b . . . . .
        . . b b b b b b b b . . .
        . b b 5 5 5 5 5 5 b b . .
        b b 5 5 5 5 5 5 5 5 b b .
        b 5 5 5 5 5 5 5 5 5 5 b .
        b 5 5 5 5 5 5 5 5 5 5 b .
        . b 5 5 5 5 5 5 5 5 b . .
        . . b b 5 5 5 5 b b . . .
        . . . . b b b b . . . . .
    `, SpriteKind.Enemy)
    rock.setPosition(randint(0, 160), 0)
    rock.setVelocity(0, randint(50, 90) + speed_boost)
    rock.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(5000, function spawn_big_rock() {
    let big = sprites.create(img`
        . . c c c c c c . .
        . c 5 5 5 5 5 5 c .
        c 5 5 5 5 5 5 5 5 c
        c 5 5 5 5 5 5 5 5 c
        c 5 5 5 5 5 5 5 5 c
        . c 5 5 5 5 5 5 c .
        . . c c c c c c . .
    `, SpriteKind.Enemy)
    big.setPosition(randint(0, 160), 0)
    big.setVelocity(0, randint(80, 120) + speed_boost)
    big.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(12000, function spawn_heart() {
    let heart = sprites.create(img`
        . . . . . . . . . . . .
        . . . . . . . . . . . .
        . . . . f f . . f f . .
        . . . f 2 2 f f 2 2 f .
        . . f 2 2 2 2 2 2 2 f .
        . . f 2 2 2 2 2 2 2 f .
        . . f 2 2 2 2 2 2 2 f .
        . . . f 2 2 2 2 2 f . .
        . . . . f 2 2 2 f . . .
        . . . . . f f f . . . .
        . . . . . . . . . . . .
    `, SpriteKind.Food)
    heart.setPosition(randint(0, 160), 0)
    heart.setVelocity(0, 40)
    heart.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(10000, function increase_speed() {
    
    speed_boost += 5
})
//  Add score over time
game.onUpdateInterval(1000, function add_score() {
    info.changeScoreBy(1)
})
//  Game over
info.onLifeZero(function on_zero_life() {
    music.wawawawaa.play()
    game.over(false, effects.dissolve)
})
