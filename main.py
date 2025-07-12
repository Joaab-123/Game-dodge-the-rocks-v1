# Splash screen
game.splash("🌩 DODGE THE ROCKS 🌩", "Move ← → to survive")

scene.set_background_color(9)

# Player sprite
hero = sprites.create(img("""
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
"""), SpriteKind.player)

controller.move_sprite(hero, 100, 0)
hero.set_stay_in_screen(True)
hero.set_position(80, 100)

# Game state
info.set_life(3)
info.set_score(0)

# === FUNCTIONS === #

def spawn_rock():
    rock = sprites.create(img("""
        . . . . b b b b . . . . .
        . . b b b b b b b b . . .
        . b b 5 5 5 5 5 5 b b . .
        b b 5 5 5 5 5 5 5 5 b b .
        b 5 5 5 5 5 5 5 5 5 5 b .
        b 5 5 5 5 5 5 5 5 5 5 b .
        . b 5 5 5 5 5 5 5 5 b . .
        . . b b 5 5 5 5 b b . . .
        . . . . b b b b . . . . .
    """), SpriteKind.enemy)
    rock.set_position(randint(0, 160), 0)
    rock.set_velocity(0, randint(50, 90) + speed_boost)
    rock.set_flag(SpriteFlag.AUTO_DESTROY, True)

def spawn_big_rock():
    big = sprites.create(img("""
        . . c c c c c c . .
        . c 5 5 5 5 5 5 c .
        c 5 5 5 5 5 5 5 5 c
        c 5 5 5 5 5 5 5 5 c
        c 5 5 5 5 5 5 5 5 c
        . c 5 5 5 5 5 5 c .
        . . c c c c c c . .
    """), SpriteKind.enemy)
    big.set_position(randint(0, 160), 0)
    big.set_velocity(0, randint(80, 120) + speed_boost)
    big.set_flag(SpriteFlag.AUTO_DESTROY, True)

def spawn_heart():
    heart = sprites.create(img("""
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
    """), SpriteKind.food)
    heart.set_position(randint(0, 160), 0)
    heart.set_velocity(0, 40)
    heart.set_flag(SpriteFlag.AUTO_DESTROY, True)

# === EVENTS === #

def on_hit(hero, rock):
    rock.destroy(effects.fire, 100)
    info.change_life_by(-1)
    scene.camera_shake(4, 200)

def on_collect(hero, heart):
    heart.destroy(effects.hearts, 100)
    info.change_life_by(1)

sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_hit)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_collect)

# === TIMED EVENTS === #

speed_boost = 0

def increase_speed():
    global speed_boost
    speed_boost += 5

# Enemies drop regularly
game.on_update_interval(1000, spawn_rock)
game.on_update_interval(5000, spawn_big_rock)
game.on_update_interval(12000, spawn_heart)
game.on_update_interval(10000, increase_speed)

# Add score over time
def add_score():
    info.change_score_by(1)
game.on_update_interval(1000, add_score)

# Game over
def on_zero_life():
    music.wawawawaa.play()
    game.over(False, effects.dissolve)

info.on_life_zero(on_zero_life)