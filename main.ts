enum ActionKind {
    RunningLeft,
    RunningRight,
    Idle,
    IdleLeft,
    IdleRight,
    JumpingLeft,
    JumpingRight,
    CrouchLeft,
    CrouchRight,
    Flying,
    Walking,
    Jumping
}
namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
    export const intro = SpriteKind.create()
    export const qr = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(ismymanu)) {
        closemenu()
        ismymanu = true
        B_Trigger = true
        if (continu == "Minigame") {
            game.pushScene()
        } else if (continu == "Promotion") {
            // 기존 메뉴 제거
            sprites.destroy(qrcode)
        }
        menu()
    }
})
function goback() {
    closemenu()
    if (continu == "Minigame") {
        game.popScene();
    } else if (continu == "Promotion") {
        promot()
    }
}
function initializeAnimations() {
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
}
function giveIntroduction() {
    game.setDialogFrame(img`
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        2 2 1 1 1 1 1 1 1 1 1 1 1 2 2 . 
        2 1 1 2 2 2 2 2 2 2 2 2 1 1 2 . 
        2 1 2 2 1 1 1 1 1 1 1 2 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 2 1 1 1 1 1 1 1 2 2 1 2 . 
        2 1 1 2 2 2 2 2 2 2 2 2 1 1 2 . 
        2 2 1 1 1 1 1 1 1 1 1 1 1 2 2 . 
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    showInstruction("Move with the left and right buttons.")
    showInstruction("Jump with the up or A button.")
    showInstruction("Double jump by pressing jump again.")
}
function initializeCoinAnimation() {
    coinAnimation = animation.createAnimation(ActionKind.Idle, 200)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . f 5 f 5 5 5 5 5 f . . . . 
        . . f 5 f 5 5 5 4 5 5 f . . . . 
        . . f 5 f 5 5 5 4 4 5 5 f . . . 
        . . f 5 f 5 5 5 4 4 5 5 f . . . 
        . . f 5 f 5 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 5 5 5 f . . . . 
        . . . . f 5 f 5 5 5 f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f 5 f 5 f f . . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . f 5 f 5 5 5 5 f f . . . . 
        . . . f 5 f 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 5 5 f f . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . . f f 5 f 5 f f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . f 5 f 5 f f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 f f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . f f 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f f 5 f 5 f . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . f f 5 f 5 f f . . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . f f 5 5 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 f 5 f . . . 
        . . . . f f 5 5 5 5 f 5 f . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . . f f 5 f 5 f f . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . f 5 5 5 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 5 f 5 f . . 
        . . . f 5 5 4 4 5 5 5 f 5 f . . 
        . . . f 5 5 4 4 5 5 5 f 5 f . . 
        . . . . f 5 5 4 5 5 5 f 5 f . . 
        . . . . f 5 5 5 5 5 f 5 f . . . 
        . . . . . f 5 5 5 f 5 f . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
function attemptJump() {
    // hero가 null인지 확인
    if (hero != null) {
        // 바닥에 닿아 있을 때만 점프
        if (hero.isHittingTile(CollisionDirection.Bottom)) {
            hero.vy = -4 * pixelsToMeters
        } else if (canDoubleJump) {
            doubleJumpSpeed = -3 * pixelsToMeters
            // 더블 점프 실행
            if (hero.vy >= -40) {
                doubleJumpSpeed = -4.5 * pixelsToMeters
                hero.startEffect(effects.trail, 500)
                scene.cameraShake(2, 250)
            }
            hero.vy = doubleJumpSpeed
            canDoubleJump = false
        }
    }
}
function animateIdle () {
    mainIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(hero, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . f f f f f . . . 
        . . . . f f f f 4 4 4 4 4 f . . 
        . . . f 7 7 7 7 7 4 4 4 f . . . 
        . . f 7 f 7 7 7 f 7 4 4 4 f . . 
        . . f 7 7 f 7 f 7 7 7 4 f . . . 
        . . f 7 1 7 7 7 1 7 7 4 f . . . 
        . . f 3 f 7 7 7 f 3 3 7 f . . . 
        . . f f 7 7 7 7 7 7 7 f f . . . 
        . . . f f 7 7 7 7 7 f 7 f . . . 
        . . . f 7 7 7 7 7 7 7 f 7 f . . 
        . . f 7 7 1 1 7 7 7 7 f 4 f . . 
        . . f 7 f 1 1 7 7 7 f 7 7 f . . 
        . . . f f 1 1 7 7 7 4 4 f . . . 
        . . . . f 7 7 f 7 7 f f . . . . 
        . . . . f f f . f f f . . . . . 
        `)
    mainIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(hero, mainIdleRight)
    mainIdleRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f . . . . . . . . 
        . . f 4 4 4 4 4 f f f f . . . . 
        . . . f 4 4 4 7 7 7 7 7 f . . . 
        . . f 4 4 4 7 f 7 7 7 f 7 f . . 
        . . . f 4 7 7 7 f 7 f 7 7 f . . 
        . . . f 4 7 7 1 7 7 7 1 7 f . . 
        . . . f 7 3 3 f 7 7 7 f 3 f . . 
        . . . f f 7 7 7 7 7 7 7 f f . . 
        . . . f 7 f 7 7 7 7 7 f f . . . 
        . . f 7 f 7 7 7 7 7 7 7 f . . . 
        . . f 4 f 7 7 7 7 1 1 7 7 f . . 
        . . f 7 7 f 7 7 7 1 1 f 7 f . . 
        . . . f 4 4 7 7 7 1 1 f f . . . 
        . . . . f f 7 7 f 7 7 f . . . . 
        . . . . . f f f . f f f . . . . 
        `)
}
function menu () {
    closemenu()
    ismymanu = true
    if (B_Trigger) {
        myMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Promotion", img`
            . . . . . . . b b . . . . . . . 
            . . . . . . b d d b . . . . . . 
            . . . . . b d 5 5 d b . . . . . 
            . . . . b b 5 5 5 5 b b . . . . 
            . . . . b 5 5 5 5 5 5 b . . . . 
            b b b b b 5 5 5 5 1 1 d b b b b 
            b 5 5 5 5 5 5 5 5 1 1 1 5 5 5 b 
            b d d 5 5 5 5 5 5 1 1 1 5 d d b 
            . b d d 5 5 5 5 5 5 5 5 d d b . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . c b 5 5 5 5 5 5 5 5 b c . . 
            . . c 5 5 5 5 d d 5 5 5 5 c . . 
            . . c 5 5 d b b b b d 5 5 c . . 
            . . c 5 d b c c c c b d 5 c . . 
            . . c c c c . . . . c c c c . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("Minigame", img`
            . . . b b b b b b b b b . . . . 
            . . b 1 d d d d d d d 1 b . . . 
            . b 1 1 1 1 1 1 1 1 1 1 1 b . . 
            . b d b c c c c c c c b d b . . 
            . b d c 6 6 6 6 6 6 6 c d b . . 
            . b d c 6 d 6 6 6 6 6 c d b . . 
            . b d c 6 6 6 6 6 6 6 c d b . . 
            . b d c 6 6 6 6 6 6 6 c d b . . 
            . b d c 6 6 6 6 6 6 6 c d b . . 
            . b d c c c c c c c c c d b . . 
            . c b b b b b b b b b b b c . . 
            c b c c c c c c c c c c c b c . 
            c 1 d d d d d d d d d d d 1 c . 
            c 1 d 1 1 d 1 1 d 1 1 d 1 1 c . 
            c b b b b b b b b b b b b b c . 
            c c c c c c c c c c c c c c c . 
            `),
        miniMenu.createMenuItem("Go Back", img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . .  
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        )
        myMenu.setTitle("Welcome!")
        myMenu.setFrame(img`
            ...cc..............................cc.....
            ..c55c..bbbb...bbbbb...bbbbb......c55c....
            .cb55bcbdddbbbbbdddbbbbbdddbbbbbbcb55bc...
            b555555bbdddb111bdddb111bdddb11db555555b..
            bb5555bbbbdb11111bdb11111bdb1111bb5555bb..
            cb5555bcddd11111ddd11111ddd11111cb5555bc..
            .c5bb5c1111d111d111d111d111d111ddc5bb5c...
            .cbbbbc11111111111111111111111111cbbbbc...
            ..b1111111111111111111111111111111dddbb...
            ..b11111111111111111111111111111111dbbdb..
            ..bb1111111111111111111111111111111dbddb..
            .bbdb1d1111111111111111111111111111ddddb..
            .bdddd1111111111111111111111111111d1bdbb..
            .bddbd1111111111111111111111111111111bb...
            .bdb1d11111111111111111111111111111111b...
            .bb111d1111111111111111111111111111111b...
            ..b1111111111111111111111111111111d111bb..
            ..b11111111111111111111111111111111d1bdb..
            ..bb1111111111111111111111111111111dbddb..
            .bbdb1d1111111111111111111111111111ddddb..
            .bdddd1111111111111111111111111111d1bdbb..
            .bddbd1111111111111111111111111111111bb...
            .bdb1d11111111111111111111111111111111b...
            .bb111d1111111111111111111111111111111b...
            ..b1111111111111111111111111111111d111bb..
            ..b11111111111111111111111111111111d1bdb..
            ..bb1111111111111111111111111111111dbddb..
            .bbdb1d1111111111111111111111111111ddddb..
            .bdddd1111111111111111111111111111d1bdbb..
            .bddbd1111111111111111111111111111111bb...
            .bdbb111111111111111111111111111111111b...
            .bbbd111111111111111111111111111111111b...
            ..bcc11111111111111111111111111111dccdb...
            ..c55c1111111d111d111d111d111d1111c55cb...
            .cb55bcdd11111ddd11111ddd11111dddcb55bc...
            b555555bd1111bdb11111bdb11111bdbb555555b..
            bb5555bbdd11bdddb111bdddb111bdddbb5555bb..
            cb5555bcbbbbbbdddbbbbbdddbbbbbddcb5555bc..
            .c5bb5c......bbbbb...bbbbb...bbbbc5bb5c...
            .cbbbbc..........................cbbbbc...
            ..........................................
            ..........................................
            `)
        myMenu.setDimensions(130, 100)
    } else {
        myMenu = miniMenu.createMenu(
        miniMenu.createMenuItem("Promotion", img`
            . . . . . . . b b . . . . . . . 
            . . . . . . b d d b . . . . . . 
            . . . . . b d 5 5 d b . . . . . 
            . . . . b b 5 5 5 5 b b . . . . 
            . . . . b 5 5 5 5 5 5 b . . . . 
            b b b b b 5 5 5 5 1 1 d b b b b 
            b 5 5 5 5 5 5 5 5 1 1 1 5 5 5 b 
            b d d 5 5 5 5 5 5 1 1 1 5 d d b 
            . b d d 5 5 5 5 5 5 5 5 d d b . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . c b 5 5 5 5 5 5 5 5 b c . . 
            . . c 5 5 5 5 d d 5 5 5 5 c . . 
            . . c 5 5 d b b b b d 5 5 c . . 
            . . c 5 d b c c c c b d 5 c . . 
            . . c c c c . . . . c c c c . . 
            . . . . . . . . . . . . . . . . 
            `),
        miniMenu.createMenuItem("Minigame", img`
            . . . b b b b b b b b b . . . . 
            . . b 1 d d d d d d d 1 b . . . 
            . b 1 1 1 1 1 1 1 1 1 1 1 b . . 
            . b d b c c c c c c c b d b . . 
            . b d c 6 6 6 6 6 6 6 c d b . . 
            . b d c 6 d 6 6 6 6 6 c d b . . 
            . b d c 6 6 6 6 6 6 6 c d b . . 
            . b d c 6 6 6 6 6 6 6 c d b . . 
            . b d c 6 6 6 6 6 6 6 c d b . . 
            . b d c c c c c c c c c d b . . 
            . c b b b b b b b b b b b c . . 
            c b c c c c c c c c c c c b c . 
            c 1 d d d d d d d d d d d 1 c . 
            c 1 d 1 1 d 1 1 d 1 1 d 1 1 c . 
            c b b b b b b b b b b b b b c . 
            c c c c c c c c c c c c c c c . 
            `)
        )
        myMenu.setTitle("Welcome!")
        myMenu.setFrame(img`
            ...cc..............................cc.....
            ..c55c..bbbb...bbbbb...bbbbb......c55c....
            .cb55bcbdddbbbbbdddbbbbbdddbbbbbbcb55bc...
            b555555bbdddb111bdddb111bdddb11db555555b..
            bb5555bbbbdb11111bdb11111bdb1111bb5555bb..
            cb5555bcddd11111ddd11111ddd11111cb5555bc..
            .c5bb5c1111d111d111d111d111d111ddc5bb5c...
            .cbbbbc11111111111111111111111111cbbbbc...
            ..b1111111111111111111111111111111dddbb...
            ..b11111111111111111111111111111111dbbdb..
            ..bb1111111111111111111111111111111dbddb..
            .bbdb1d1111111111111111111111111111ddddb..
            .bdddd1111111111111111111111111111d1bdbb..
            .bddbd1111111111111111111111111111111bb...
            .bdb1d11111111111111111111111111111111b...
            .bb111d1111111111111111111111111111111b...
            ..b1111111111111111111111111111111d111bb..
            ..b11111111111111111111111111111111d1bdb..
            ..bb1111111111111111111111111111111dbddb..
            .bbdb1d1111111111111111111111111111ddddb..
            .bdddd1111111111111111111111111111d1bdbb..
            .bddbd1111111111111111111111111111111bb...
            .bdb1d11111111111111111111111111111111b...
            .bb111d1111111111111111111111111111111b...
            ..b1111111111111111111111111111111d111bb..
            ..b11111111111111111111111111111111d1bdb..
            ..bb1111111111111111111111111111111dbddb..
            .bbdb1d1111111111111111111111111111ddddb..
            .bdddd1111111111111111111111111111d1bdbb..
            .bddbd1111111111111111111111111111111bb...
            .bdbb111111111111111111111111111111111b...
            .bbbd111111111111111111111111111111111b...
            ..bcc11111111111111111111111111111dccdb...
            ..c55c1111111d111d111d111d111d1111c55cb...
            .cb55bcdd11111ddd11111ddd11111dddcb55bc...
            b555555bd1111bdb11111bdb11111bdbb555555b..
            bb5555bbdd11bdddb111bdddb111bdddbb5555bb..
            cb5555bcbbbbbbdddbbbbbdddbbbbbddcb5555bc..
            .c5bb5c......bbbbb...bbbbb...bbbbc5bb5c...
            .cbbbbc..........................cbbbbc...
            ..........................................
            ..........................................
            `)
        myMenu.setDimensions(130, 80)
    }
    myMenu.setPosition(80, 60)
    myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 8)
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selection == "Minigame") {
            continu = ""
            minigame()
        } else if (selection == "Promotion") {
            continu = ""
            promot()
        } else if (selection == "Go Back") {
            goback()
        }
    })
}
function setLevelTileMap (level: number) {
    if (level == 0) {
        tiles.setTilemap(tilemap`level`)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level_1`)
    } else if (level == 3) {
        tiles.setTilemap(tilemap`level_2`)
    } else if (level == 4) {
        tiles.setTilemap(tilemap`level_3`)
    } else if (level == 5) {
        tiles.setTilemap(tilemap`level_4`)
    } else if (level == 6) {
        tiles.setTilemap(tilemap`level_5`)
    } else if (level == 7) {
        tiles.setTilemap(tilemap`level_6`)
    }
    initializeLevel(level)
}
function initializeFlierAnimations () {
    flierFlying = animation.createAnimation(ActionKind.Flying, 100)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . f 4 5 5 4 4 4 5 5 4 f . . 
        . f . f 4 4 4 5 4 5 4 4 4 f . f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . . . f 4 4 5 5 5 5 5 4 4 f . . 
        . . . . f 4 5 4 4 4 5 4 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . f 4 5 5 4 4 4 5 5 4 f . . 
        . . . f 4 4 4 5 4 5 4 4 4 f . . 
        . . f 4 4 4 4 4 4 4 4 4 4 4 f . 
        . . f 4 4 4 4 5 4 5 4 4 4 4 f . 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
        . f 4 f 4 4 5 5 5 5 5 4 4 f 4 f 
        . f f . f 4 5 4 4 4 5 4 f . f f 
        . f . . . f f f f f f f . . . f 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . f 4 5 5 4 4 4 5 5 4 f . . 
        . f . f 4 4 4 5 4 5 4 4 4 f . f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . . . f 4 4 5 5 5 5 5 4 4 f . . 
        . . . . f 4 5 4 4 4 5 4 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    flierIdle = animation.createAnimation(ActionKind.Idle, 100)
    flierIdle.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . f 4 5 5 4 4 4 5 5 4 f . . 
        . f . f 4 4 4 5 4 5 4 4 4 f . f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . . . f 4 4 5 5 5 5 5 4 4 f . . 
        . . . . f 4 5 4 4 4 5 4 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
function animateRun () {
    mainRunLeft = animation.createAnimation(ActionKind.RunningLeft, 100)
    animation.attachAnimation(hero, mainRunLeft)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f 4 4 4 f . . . 
        . . f 7 7 7 7 4 4 4 4 f f . . . 
        . f 7 7 7 7 7 7 4 4 4 4 4 f . . 
        . f 7 f 7 7 7 7 7 4 4 4 4 f . . 
        . f f 7 7 7 7 7 7 7 4 4 f . . . 
        . f 7 1 7 7 7 7 7 7 4 f . . . . 
        . f 7 f 3 3 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 7 7 7 7 7 f . . . . 
        . . f 7 7 f 7 7 7 7 7 f . . . . 
        . . f 1 1 f 7 7 f 7 7 f . . . . 
        . . f 1 1 1 7 7 f 7 7 f . . . . 
        . . f 1 1 1 f f 7 7 7 f . . . . 
        . . . f 1 1 7 7 7 f f . . . . . 
        . . . f 7 7 7 7 7 f . . . . . . 
        . . . . f f f f f . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f 4 4 4 f . . . 
        . . f 7 7 7 7 4 4 4 4 f f . . . 
        . f 7 7 7 7 7 7 4 4 4 4 4 f . . 
        . f 7 f 7 7 7 7 7 4 4 4 4 f . . 
        . f f 7 7 7 7 7 7 7 4 4 f . . . 
        . f 7 1 7 7 7 7 7 7 4 f . . . . 
        . f 7 f 3 3 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 7 7 7 7 7 f . . . . 
        . . f 7 7 7 7 7 7 7 7 f . . . . 
        . . f 1 1 1 f 7 7 f 7 f . . . . 
        . . f 1 1 f 7 7 f 7 f f f . . . 
        . . f 1 1 f f f 7 7 7 7 f f . . 
        . . . f 7 7 7 f f 7 7 7 f f . . 
        . . . . f f f . f f f f f . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f 4 4 4 f . . . 
        . . f 7 7 7 7 4 4 4 4 f f . . . 
        . f 7 7 7 7 7 7 4 4 4 4 4 f . . 
        . f 7 f 7 7 7 7 7 4 4 4 4 f . . 
        . f f 7 7 7 7 7 7 7 4 4 f . . . 
        . f 7 1 7 7 7 7 7 7 4 f . . . . 
        . f 7 f 3 3 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 7 7 7 7 7 f . . . . 
        . . f 7 7 f 7 7 7 7 7 f . . . . 
        . . f 1 1 f 7 7 f 7 7 f . . . . 
        . . f 1 1 1 7 7 f 7 7 f . . . . 
        . . f 1 1 1 f f 7 7 7 f . . . . 
        . . . f 1 1 7 7 7 f f . . . . . 
        . . . f 7 7 7 7 7 f . . . . . . 
        . . . . f f f f f . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f 4 4 4 f . . . 
        . . f 7 7 7 7 4 4 4 4 f f . . . 
        . f 7 7 7 7 7 7 4 4 4 4 4 f . . 
        . f 7 f 7 7 7 7 7 4 4 4 4 f . . 
        . f f 7 7 7 7 7 7 7 4 4 f . . . 
        . f 7 1 7 7 7 7 7 7 4 f . . . . 
        . f 7 f 3 3 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 7 7 7 7 7 f . . . . 
        . . f 7 7 f 7 7 7 7 7 f . . . . 
        . f 7 7 7 f 7 7 7 7 7 f . . . . 
        f f f 7 f 7 f f f f f f . . . . 
        f f f f 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 f 7 7 7 f f . . . . . 
        . f f f f . f f f . . . . . . . 
        `)
    mainRunRight = animation.createAnimation(ActionKind.RunningRight, 100)
    animation.attachAnimation(hero, mainRunRight)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f 4 4 4 f f f f f f . . . 
        . . . f f 4 4 4 4 7 7 7 7 f . . 
        . . f 4 4 4 4 4 7 7 7 7 7 7 f . 
        . . f 4 4 4 4 7 7 7 7 7 f 7 f . 
        . . . f 4 4 7 7 7 7 7 7 7 f f . 
        . . . . f 4 7 7 7 7 7 7 1 7 f . 
        . . . . f 7 7 7 7 7 3 3 f 7 f . 
        . . . . f 7 7 7 7 7 7 7 7 7 f . 
        . . . . f 7 7 7 7 7 f 7 7 f . . 
        . . . . f 7 7 f 7 7 f 1 1 f . . 
        . . . . f 7 7 f 7 7 1 1 1 f . . 
        . . . . f 7 7 7 f f 1 1 1 f . . 
        . . . . . f f 7 7 7 1 1 f . . . 
        . . . . . . f 7 7 7 7 7 f . . . 
        . . . . . . . f f f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f 4 4 4 f f f f f f . . . 
        . . . f f 4 4 4 4 7 7 7 7 f . . 
        . . f 4 4 4 4 4 7 7 7 7 7 7 f . 
        . . f 4 4 4 4 7 7 7 7 7 f 7 f . 
        . . . f 4 4 7 7 7 7 7 7 7 f f . 
        . . . . f 4 7 7 7 7 7 7 1 7 f . 
        . . . . f 7 7 7 7 7 3 3 f 7 f . 
        . . . . f 7 7 7 7 7 7 7 7 7 f . 
        . . . . f 7 7 7 7 7 7 7 7 f . . 
        . . . . f 7 f 7 7 f 1 1 1 f . . 
        . . . f f f 7 f 7 7 f 1 1 f . . 
        . . f f 7 7 7 7 f f f 1 1 f . . 
        . . f f 7 7 7 f f 7 7 7 f . . . 
        . . . f f f f f . f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f 4 4 4 f f f f f f . . . 
        . . . f f 4 4 4 4 7 7 7 7 f . . 
        . . f 4 4 4 4 4 7 7 7 7 7 7 f . 
        . . f 4 4 4 4 7 7 7 7 7 f 7 f . 
        . . . f 4 4 7 7 7 7 7 7 7 f f . 
        . . . . f 4 7 7 7 7 7 7 1 7 f . 
        . . . . f 7 7 7 7 7 3 3 f 7 f . 
        . . . . f 7 7 7 7 7 7 7 7 7 f . 
        . . . . f 7 7 7 7 7 f 7 7 f . . 
        . . . . f 7 7 f 7 7 f 1 1 f . . 
        . . . . f 7 7 f 7 7 1 1 1 f . . 
        . . . . f 7 7 7 f f 1 1 1 f . . 
        . . . . . f f 7 7 7 1 1 f . . . 
        . . . . . . f 7 7 7 7 7 f . . . 
        . . . . . . . f f f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f 4 4 4 f f f f f f . . . 
        . . . f f 4 4 4 4 7 7 7 7 f . . 
        . . f 4 4 4 4 4 7 7 7 7 7 7 f . 
        . . f 4 4 4 4 7 7 7 7 7 f 7 f . 
        . . . f 4 4 7 7 7 7 7 7 7 f f . 
        . . . . f 4 7 7 7 7 7 7 1 7 f . 
        . . . . f 7 7 7 7 7 3 3 f 7 f . 
        . . . . f 7 7 7 7 7 7 7 7 7 f . 
        . . . . f 7 7 7 7 7 f 7 7 f . . 
        . . . . f 7 7 7 7 7 f 7 7 7 f . 
        . . . . f f f f f f 7 f 7 f f f 
        . . . . f 7 7 7 7 7 7 7 f f f f 
        . . . . . f f 7 7 7 f 7 7 7 f . 
        . . . . . . . f f f . f f f f . 
        `)
}
function animateJumps () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    mainJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . f f f f f . . . 
        . . . . f f f f 4 4 4 4 4 f . . 
        . . . f 7 7 7 7 7 4 4 4 f . . . 
        . . f 7 f 7 7 7 f 7 4 4 4 f . . 
        . . f 7 7 f 7 f 7 7 7 4 f . . . 
        . . f 7 1 7 7 7 1 7 7 4 f . . . 
        . . f 3 f 7 7 7 f 3 3 7 f . . . 
        . . f f 7 7 7 7 7 7 7 f f . . . 
        . . . f f 7 7 7 7 7 f 7 f . . . 
        . . . f 7 7 7 7 7 7 7 f 7 f . . 
        . . f 7 7 1 1 7 7 7 7 f 4 f . . 
        . . f 7 f 1 1 7 7 7 f 7 7 f . . 
        . . . f f 1 1 7 7 7 4 4 f . . . 
        . . . . f 7 7 f 7 7 f f . . . . 
        . . . . f f f . f f f . . . . . 
        `)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . f f f f f . . . 
        . . . . f f f f 4 4 4 4 4 f . . 
        . . . f 7 7 7 7 7 4 4 4 f . . . 
        . . f 7 f 7 7 7 f 7 4 4 4 f . . 
        . . f 7 7 f 7 f 7 7 7 4 f . . . 
        . . f 7 1 7 7 7 1 7 7 4 f . . . 
        . . f 3 f 7 7 7 f 3 3 7 f . . . 
        . . f f 7 7 7 7 7 7 7 f f . . . 
        . . . f 7 7 7 7 7 7 7 f 7 f . . 
        . . f 7 7 1 1 7 7 7 7 f 4 f . . 
        . . f 7 f 1 1 7 7 7 f 7 7 f . . 
        . . . f f 1 1 7 7 7 4 4 f . . . 
        . . . . f 7 7 f 7 7 f f . . . . 
        . . . . f f f . f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpLeft.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . f f f f f . . . 
            . . . . f f f f 4 4 4 4 4 f . . 
            . . . f 7 7 7 7 7 4 4 4 f . . . 
            . . f 7 f 7 7 7 f 7 4 4 4 f . . 
            . . f 7 7 f 7 f 7 7 7 4 f . . . 
            . . f 7 1 7 7 7 1 7 7 4 f . . . 
            . . f 3 f 7 7 7 f 3 3 7 f . . . 
            . . f f 7 7 7 7 7 7 7 f 7 f . . 
            . . f 7 7 1 1 7 7 7 7 f 4 f . . 
            . . f 7 f 1 1 7 7 7 f 7 7 f . . 
            . . . f f 1 1 7 7 7 4 4 f . . . 
            . . . . f 7 7 f 7 7 f f . . . . 
            . . . . f f f . f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
    mainJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, mainJumpRight)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f . . . . . . . . 
        . . f 4 4 4 4 4 f f f f . . . . 
        . . . f 4 4 4 7 7 7 7 7 f . . . 
        . . f 4 4 4 7 f 7 7 7 f 7 f . . 
        . . . f 4 7 7 7 f 7 f 7 7 f . . 
        . . . f 4 7 7 1 7 7 7 1 7 f . . 
        . . . f 7 3 3 f 7 7 7 f 3 f . . 
        . . . f f 7 7 7 7 7 7 7 f f . . 
        . . . f 7 f 7 7 7 7 7 f f . . . 
        . . f 7 f 7 7 7 7 7 7 7 f . . . 
        . . f 4 f 7 7 7 7 1 1 7 7 f . . 
        . . f 7 7 f 7 7 7 1 1 f 7 f . . 
        . . . f 4 4 7 7 7 1 1 f f . . . 
        . . . . f f 7 7 f 7 7 f . . . . 
        . . . . . f f f . f f f . . . . 
        `)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f . . . . . . . . 
        . . f 4 4 4 4 4 f f f f . . . . 
        . . . f 4 4 4 7 7 7 7 7 f . . . 
        . . f 4 4 4 7 f 7 7 7 f 7 f . . 
        . . . f 4 7 7 7 f 7 f 7 7 f . . 
        . . . f 4 7 7 1 7 7 7 1 7 f . . 
        . . . f 7 3 3 f 7 7 7 f 3 f . . 
        . . . f f 7 7 7 7 7 7 7 f f . . 
        . . f 7 f 7 7 7 7 7 7 7 f . . . 
        . . f 4 f 7 7 7 7 1 1 7 7 f . . 
        . . f 7 7 f 7 7 7 1 1 f 7 f . . 
        . . . f 4 4 7 7 7 1 1 f f . . . 
        . . . . f f 7 7 f 7 7 f . . . . 
        . . . . . f f f . f f f . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpRight.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . . . f f f f f . . . . . . . . 
            . . f 4 4 4 4 4 f f f f . . . . 
            . . . f 4 4 4 7 7 7 7 7 f . . . 
            . . f 4 4 4 7 f 7 7 7 f 7 f . . 
            . . . f 4 7 7 7 f 7 f 7 7 f . . 
            . . . f 4 7 7 1 7 7 7 1 7 f . . 
            . . . f 7 3 3 f 7 7 7 f 3 f . . 
            . . f 7 f 7 7 7 7 7 7 7 f f . . 
            . . f 4 f 7 7 7 7 1 1 7 7 f . . 
            . . f 7 7 f 7 7 7 1 1 f 7 f . . 
            . . . f 4 4 7 7 7 1 1 f f . . . 
            . . . . f f 7 7 f 7 7 f . . . . 
            . . . . . f f f . f f f . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
}
function animateCrouch () {
    mainCrouchLeft = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(hero, mainCrouchLeft)
    mainCrouchLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . f f f f f . . . 
        . . . . f f f f 4 4 4 4 4 f . . 
        . . . f 7 7 7 7 7 4 4 4 f . . . 
        . . f 7 f 7 7 7 f 7 4 4 4 f . . 
        . . f 7 7 f 7 f 7 7 7 4 f . . . 
        . . f 7 1 7 7 7 1 7 7 4 f . . . 
        . . f 3 f 7 7 7 f 3 3 7 f . . . 
        . . f f 7 7 7 7 7 7 7 f 7 f . . 
        . . f 7 7 1 1 7 7 7 7 f 4 f . . 
        . . f 7 f 1 1 7 7 7 f 7 7 f . . 
        . . . f f 1 1 7 7 7 4 4 f . . . 
        . . . . f 7 7 f 7 7 f f . . . . 
        . . . . f f f . f f f . . . . . 
        `)
    mainCrouchRight = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(hero, mainCrouchRight)
    mainCrouchRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f . . . . . . . . 
        . . f 4 4 4 4 4 f f f f . . . . 
        . . . f 4 4 4 7 7 7 7 7 f . . . 
        . . f 4 4 4 7 f 7 7 7 f 7 f . . 
        . . . f 4 7 7 7 f 7 f 7 7 f . . 
        . . . f 4 7 7 1 7 7 7 1 7 f . . 
        . . . f 7 3 3 f 7 7 7 f 3 f . . 
        . . f 7 f 7 7 7 7 7 7 7 f f . . 
        . . f 4 f 7 7 7 7 1 1 7 7 f . . 
        . . f 7 7 f 7 7 7 1 1 f 7 f . . 
        . . . f 4 4 7 7 7 1 1 f f . . . 
        . . . . f f 7 7 f 7 7 f . . . . 
        . . . . . f f f . f f f . . . . 
        `)
}
let eventRegistered = false // 이벤트 등록 여부를 추적
function clearGame () {
    for (let value of sprites.allOfKind(SpriteKind.Bumper)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Goal)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flier)) {
        value4.destroy()
    }
     // 이벤트가 중복 등록되지 않도록 조건 확인
    if (!eventRegistered) {
        scene.onOverlapTile(SpriteKind.Player, assets.tile`tile1`, function (sprite, location) {
            info.changeLifeBy(1)
            currentLevel += 1
            if (hasNextLevel()) {
                game.splash("Next level unlocked!")
                setLevelTileMap(currentLevel)
            } else {
                game.over(true, effects.confetti)
            }
        })

        sprites.onOverlap(SpriteKind.Player, SpriteKind.Flier, function (sprite, otherSprite) {
            info.changeLifeBy(-1)
            sprite.say("Ow!", invincibilityPeriod * 1.5)
            music.powerDown.play()
            pause(invincibilityPeriod * 1.5)
            sprite.say("")
        })

        sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
            otherSprite.destroy(effects.trail, 250)
            otherSprite.y += -3
            info.changeScoreBy(3)
            music.baDing.play()
        })

        sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
            if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
                otherSprite.destroy(effects.ashes, 250)
                otherSprite.vy = -50
                sprite.vy = -2 * pixelsToMeters
                info.changeScoreBy(1)
                music.powerUp.play()
            } else {
                info.changeLifeBy(-1)
                sprite.say("Ow!", invincibilityPeriod)
                music.powerDown.play()
                pause(invincibilityPeriod)
                sprite.say("")
            }
            pause(invincibilityPeriod)
        })

        // 이벤트가 등록되었음을 표시
        eventRegistered = true
    }
}
function minigame () {
    eventRegistered = false
    destroy()
    closemenu()
    clearGame()
    continu = "Minigame"
    hero = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f . . . . . . . . 
        . . f 4 4 4 4 4 f f f f . . . . 
        . . . f 4 4 4 7 7 7 7 7 f . . . 
        . . f 4 4 4 7 f 7 7 7 f 7 f . . 
        . . . f 4 7 7 7 f 7 f 7 7 f . . 
        . . . f 4 7 7 1 7 7 7 1 7 f . . 
        . . . f 7 3 3 f 7 7 7 f 3 f . . 
        . . . f f 7 7 7 7 7 7 7 f f . . 
        . . . f 7 f 7 7 7 7 7 f f . . . 
        . . f 7 f 7 7 7 7 7 7 7 f . . . 
        . . f 4 f 7 7 7 7 1 1 7 7 f . . 
        . . f 7 7 f 7 7 7 1 1 f 7 f . . 
        . . . f 4 4 7 7 7 1 1 f f . . . 
        . . . . f f 7 7 f 7 7 f . . . . 
        . . . . . f f f . f f f . . . . 
        `, SpriteKind.Player)
    // how long to pause between each contact with a
    // single enemy
    invincibilityPeriod = 600
    pixelsToMeters = 30
    gravity = 9.81 * pixelsToMeters
    scene.setBackgroundImage(img`
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9989998999899989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989998999899989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998999899989998999899989998999899989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989898999898989998989899989998999899989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
        9899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999989999999899999998999999999999999999999999999999
        8989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989898989
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        `)
    initializeAnimations()
    createPlayer(hero)
    levelCount = 8
    currentLevel = 0
    setLevelTileMap(currentLevel)
    if(!game_Trigger){
        giveIntroduction()
        game_Trigger = false
    }
    game_setting()
}
function closemenu () {
    if (ismymanu) {
        // 기존 메뉴 제거
        sprites.destroy(myMenu)
    }
    ismymanu = false
}

function createEnemies () {
    // enemy that moves back and forth
    for (let value5 of tiles.getTilesByType(assets.tile`tile4`)) {
        bumper = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . f b 2 b b b 2 f . . . . . 
            . . f b b b 2 b 2 b b f . . . . 
            . . f b b b b b b b b b f . . . 
            . f b b b 2 b b b 2 b b f . . . 
            . f b b b 2 b b b 2 b b b f . . 
            . f b b b b b b b b b b b b f . 
            . f b b b b 2 2 2 b b b b b f . 
            . . f b b 2 2 b 2 2 b b b b f . 
            . . f b b 2 b b b 2 2 b b b f . 
            . . . f b b b b b b b b b b f . 
            . . . . f f b b b b b b b f . . 
            . . . . . . f f f f f f f . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Bumper)
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
    }
    // enemy that flies at player
    for (let value6 of tiles.getTilesByType(assets.tile`tile7`)) {
        flier = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 4 4 4 4 4 4 4 f . . . 
            . . . f 4 5 5 4 4 4 5 5 4 f . . 
            . f . f 4 4 4 5 4 5 4 4 4 f . f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . . . f 4 4 5 5 5 5 5 4 4 f . . 
            . . . . f 4 5 4 4 4 5 4 f . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
        animation.attachAnimation(flier, flierFlying)
        animation.attachAnimation(flier, flierIdle)
    }
}
info.onLifeZero(function () {
    pause(invincibilityPeriod * 1.5)
    game.splash("Game Over!")
    game.splash("Game Score : " + info.score())
    game_Trigger = true
    minigame()
})
function game_setting () {
    game.onUpdate(function () {
        for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
            if (value9.isHittingTile(CollisionDirection.Left)) {
                value9.vx = Math.randomRange(30, 60)
            } else if (value9.isHittingTile(CollisionDirection.Right)) {
                value9.vx = Math.randomRange(-60, -30)
            }
        }
        for (let value8 of sprites.allOfKind(SpriteKind.Flier)) {
            if (Math.abs(value8.x - hero.x) < 60) {
                if (value8.x - hero.x < -5) {
                    value8.vx = 25
                } else if (value8.x - hero.x > 5) {
                    value8.vx = -25
                }
                if (value8.y - hero.y < -5) {
                    value8.vy = 25
                } else if (value8.y - hero.y > 5) {
                    value8.vy = -25
                }
                animation.setAction(value8, ActionKind.Flying)
            } else {
                value8.vy = -20
                value8.vx = 0
                animation.setAction(value8, ActionKind.Idle)
            }
        
        }
        if (hero != null) {
            // hero가 null인지 확인
            if (hero.vx < 0) {
                heroFacingLeft = true
            } else if (hero.vx > 0) {
                heroFacingLeft = false
            }
            if (hero.isHittingTile(CollisionDirection.Bottom)) {
                canDoubleJump = true
            }
            if (hero.isHittingTile(CollisionDirection.Top)) {
                hero.vy = 0
            }
            if (controller.down.isPressed()) {
                if (heroFacingLeft) {
                    animation.setAction(hero, ActionKind.CrouchLeft)
                } else {
                    animation.setAction(hero, ActionKind.CrouchRight)
                }
            } else if (hero.vy < 20 && !(hero.isHittingTile(CollisionDirection.Bottom))) {
                if (heroFacingLeft) {
                    animation.setAction(hero, ActionKind.JumpingLeft)
                } else {
                    animation.setAction(hero, ActionKind.JumpingRight)
                }
            } else if (hero.vx < 0) {
                animation.setAction(hero, ActionKind.RunningLeft)
            } else if (hero.vx > 0) {
                animation.setAction(hero, ActionKind.RunningRight)
            } else {
                if (heroFacingLeft) {
                    animation.setAction(hero, ActionKind.IdleLeft)
                } else {
                    animation.setAction(hero, ActionKind.IdleRight)
                }
            }
        }
    })
    controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
                if (hero != null) {
                    // hero가 null인지 확인
                    if (!(hero.isHittingTile(CollisionDirection.Bottom))) {
                        hero.vy += 80
                    }
                }
            })
    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
                attemptJump()
            })
    controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
            attemptJump()
    })
    controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
        if (!(ismymanu)) {
            closemenu()
            ismymanu = true
            B_Trigger = true
            if (continu == "Minigame") {
                game.pushScene()
            } else if (continu == "Promotion") {
                // 기존 메뉴 제거
                sprites.destroy(qrcode)
            }
            menu()
        }
    })
}
function showInstruction (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
    music.baDing.play()
    info.changeScoreBy(1)
}
function initializeHeroAnimations () {
    animateRun()
    animateIdle()
    animateCrouch()
    animateJumps()
}
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
    info.setLife(3)
    info.setScore(0)
}
function destroy () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Bumper)
    sprites.destroyAllSpritesOfKind(SpriteKind.Goal)
    sprites.destroyAllSpritesOfKind(SpriteKind.Coin)
    sprites.destroyAllSpritesOfKind(SpriteKind.Flier)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
}
function initializeLevel (level: number) {
    effects.clouds.startScreenEffect()
    playerStartLocation = tiles.getTilesByType(assets.tile`myTile`)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, assets.tile`tile0`)
    createEnemies()
    spawnGoals()
}
function promot () {
    closemenu()
    B_Trigger = false
    if (continu == "") {
        game.splash("Promotion Code is ", "\"HACKLU2024EQST\"")
        continu = "Promotion"
    }
    qrcode = sprites.create(img`
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfff
        ffb1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111bfff
        ffb1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111bfff
        ffb11bcccccccccccccccccccccccccd111cccb111bccccccccccd1111111ccccccccccccccb1111111111dcccccccccccccccccccccccccb11bfff
        ffb11cfffffffffffffffffffffffffd11dfffc111cffffffffffb111111dffffffffffffffc1111111111dfffffffffffffffffffffffffc11bfff
        ffb11cfffffffffffffffffffffffffd11dfffc111cffffffffffb111111dffffffffffffffc1111111111dfffffffffffffffffffffffffc11bfff
        ffb11cfffffffffffffffffffffffffd11dfffc111cffffffffffb111111dffffffffffffffc1111d1d111dfffffffffffffffffffffffffc11bfff
        ffb11cfffddddddddddddddddddbfffd11dfffc111cffffffcddd11111111dddbfffffffdddd111cfffd11dfffcddddddddddddddddddfffc11bfff
        ffb11cfffd11111111111111111bfffd11dfffc111cffffffc11111111111111bfffffff1111111cfffd11dfffb11111111111111111dfffc11bfff
        ffb11cfffd11111111111111111bfffd11dfffc111cffffffc11111111111111bfffffff1111111cfffd11dfffb11111111111111111dfffc11bfff
        ffb11cfffd11dbbbbbbbbbbd111bfffd11dfffcbbdccccccccbbbd1111111bbbcfffccccbbbd111bccc111dfffb111dbbbbbbbbbb111dfffc11bfff
        ffb11cfffd11bffffffffffc111bfffd11dfffffffb111111dfffb111111dfffffffd111fffc1111111111dfffb111cffffffffffb11dfffc11bfff
        ffb11cfffd11bffffffffffc111bfffd11dfffffffb111111dfffb111111dfffffffd111fffc1111111111dfffb111cffffffffffd11dfffc11bfff
        ffb11cfffd11bffffffffffc111bfffd11dfffffffb111111dfffb111111dfffffffd111fffc1111111111dfffb111cffffffffffb11dfffc11bfff
        ffb11cfffd11bffffffffffc111bfffd111bbbbbbbcccc111dfffb1111111bbbcfffccccfffc111bccc111dfffb111cffffffffffb11dfffc11bfff
        ffb11cfffd11bffffffffffc111bfffd1111111111cfff111dfffb1111111111bffffffffffc111cfffd11dfffb111cffffffffffb11dfffc11bfff
        ffb11cfffd11bffffffffffc111bfffd1111111111cfff111dfffb1111111111bffffffffffc111cfffd11dfffb111cffffffffffb11dfffc11bfff
        ffb11cfffd11bffffffffffc111bfffd1111111111cfff111dfffb1111111111bffffffffffc111cfffd11dfffb111cffffffffffb11dfffc11bfff
        ffb11cfffd11bffffffffffc111bfffd11dfffffffffff1111d111111cffffffffffffff1d1bfffffffd11dfffb111cffffffffffb11dfffc11bfff
        ffb11cfffd11bffffffffffc111bfffd11dfffffffffff11111111111fffffffffffffff111bfffffffd11dfffb111cffffffffffb11dfffc11bfff
        ffb11cfffd11bffffffffffc111bfffd11dfffffffffff11111111111fffffffffffffff111bfffffffd11dfffb111cffffffffffb11dfffc11bfff
        ffb11cfffd11dccccccccccc111bfffd111cccffffffffdddddddd111ccccffffffffccc111dcccffffd11dfffb111cccccccccccd11dfffc11bfff
        ffb11cfffd11111111111111111bfffd111111bffffffffffffffb111111dfffffffd1111111111cfffd11dfffb11111111111111111dfffc11bfff
        ffb11cfffd11111111111111111bfffd111111bffffffffffffffb111111dfffffffd1111111111cfffd11dfffb11111111111111111dfffc11bfff
        ffb11cfffd11111111111111111bfffd111111bffffffffffffffb111111dfffffffd1111111111cfffd11dfffb11111111111111111dfffc11bfff
        ffb11cfffbbbbbbbbbbbbbbbbbbcfffd111bbbbbbbffffcbbcfffb111bbbbcbbcfffd111bbbb111cfffd11dfffcbbbbbbbbbbbbbbbbbbfffc11bfff
        ffb11cfffffffffffffffffffffffffd11dfffc111cfff111dfffb111ffff111bfffd111fffc111cfffd11dfffffffffffffffffffffffffc11bfff
        ffb11cfffffffffffffffffffffffffd11dfffc111cfff111dfffb111ffff111bfffd111fffc111cfffd11dfffffffffffffffffffffffffc11bfff
        ffb11cfffffffffffffffffffffffffd11dfffc111cfff111dfffb111ffff111bfffd111fffc111cfffd11dfffffffffffffffffffffffffc11bfff
        ffb11dddddddddddddddddddddddddd1111dddbcccbdddccccdddccccddddcccfffffcccfffc111dddd1111dddddddddddddddddddddddddd11bfff
        ffb11111111111111111111111111111111111bfffb111fffc111cfffd11dffffffffffffffc111111111111111111111111111111111111111bfff
        ffb11111111111111111111111111111111111bfffb111fffc111cfffd11dffffffffffffffc111111111111111111111111111111111111111bfff
        ffb111ddd11111111dddddddddddddddddddddbfffb111fffcdddcfffd11dffffffffffffffcdd1ddddddd111111111ddd1111dddddddddd111bfff
        ffb11cfffd111111cfffffffffffffffffffffffffb111fffffffffffd1111111111cfff111bffffffffffc1111111cfff111bffffffffffc11bfff
        ffb11cfffd111111cfffffffffffffffffffffffffb111fffffffffffd1111111111cfff111dffffffffffc1111111cfff111bffffffffffc11bfff
        ffb11cfffd111111cfffffffffffffffffffffffffb111fffffffffffd1111111111cfff111bffffffffffc1111111cfff111bffffffffffc11bfff
        ffb11bcccbbbbbbbbccccccccccccccccccccccfffcbbbcccccccffffd111111dbbbcccc111dcccccccfffc1111111cfffbbbcfffccccfffc11dfff
        ffb11111dfffffffb111111111111111111111bfffffff1111111cfffd111111bfffd11111111111111fffc1111111cffffffffffb11dfffc11bfff
        ffb111111fffffffb111111111111111111111bfffffff1111111cfffd111111bfffd11111111111111fffc1111111cffffffffffb11dfffc11bfff
        ffb111111fffffffb111111111111111111111bfffffff1111111cfffd111111bfffd11111111111111fffc1111111cffffffffffb11dfffc11bfff
        ffb11bcccfffffffcccccccc111bcccd111ccccfffffffcccb111cfffd111ccccfffd1111111111bcccbbbd1111111dbbbfffcbbbd111bbbd11bfff
        ffb11cfffffffffffffffffc111bfffd11dffffffffffffffc111cfffd11dfffffffd1111111111cfffd11111111111111fffc1111111111111bfff
        ffb11cfffffffffffffffffc111bfffd11dffffffffffffffc111cfffd11dfffffffd1111111111cfffd11111111111111fffc1111111111111bfff
        ffb11cfffffffffffffffffc111bfffd11dffffffffffffffc111cfffd11dfffffffd1111111111cfffd11111111111111fffc1111111111111bfff
        ffb11cfffd1111111111fffc1111111111dfffffffb111fffffffffffd111111bfffd111fffffffffffd1111111111cffffffc111cfff111111bfff
        ffb11cfffd1111111111fffc1111111111dfffffffb111fffffffffffd111111bfffd111fffffffffffd1111111111cffffffc111cfff111111bfff
        ffb11cfffd1111111111fffc1111111111dfffffffb111fffffffffffd111111bfffd111fffffffffffd1111111111cffffffc111cfff111111bfff
        ffb11bcccbddddddd111ffffddddddddddbfffffffb111fffffffffffd111dddcfffbdddccccfffffffbddd111ddddccccfffcdddccccbddd11bfff
        ffb11111dfffffffb111ffffffffffffffffffffffb111fffffffffffd11dfffffffffff111bffffffffffc111bfffd11dfffffffb11dfffc11bfff
        ffb11111dfffffffb111ffffffffffffffffffffffb111fffffffffffd11dfffffffffff111bffffffffffc111bfffd11dfffffffb11dfffc11bfff
        ffb111111fffffffb111ffffffffffffffffffffffb111fffffffffffd11dfffffffffff111bffffffffffc111bfffd11dfffffffb11dfffc11bfff
        ffb11bcccbbbcfffb111bbbcfffcbbbbbbbbbbbbbbd111ffffbbbcfffccccbbbcfffcbbb111dbbbbbbbfffc111cfffd111bbbcfffb111bbbd11bfff
        ffb11cfffd11bfffb111111dfffb111111111111111111fffc111cfffffff111bfffd11111111111111fffc111bfffd111111bfffb111111111bfff
        ffb11cfffd11bfffb111111dfffb111111111111111111fffc111cfffffff111bfffd11111111111111fffc111bfffd111111bfffb111111111bfff
        ffb11cfffd11bfffb111111dfffc111111111111111111fffc111cfffffff111bfffd11111111111111fffc111bfffd111111bfffb111111111bfff
        ffb11cffffffcdddcfff1111dddbfffd11dfffffffd111fffffffffffdddd111bffffffffffffffffffddddfffbddd1111111bffffffc111111bfff
        ffb11cffffffc111cfffd111111bfffd11dfffffffb111fffffffffffd111111bffffffffffffffffffd11dfffb1111111111bfffffffd11111bfff
        ffb11cffffffc111cfff1111111bfffd11dfffffffb111fffffffffffd111111bffffffffffffffffffd11dfffb1111111111bfffffff111111bfff
        ffb11cffffffcdddcfffdddd111bfffd11dfffffffbdddfffffffffffd111dddbffffffffffffffffffddddfffb111dddd111bffffffc111111bfff
        ffb111111111bfffb111fffc1111111111dfffffffffff111dfffb111111dfffc111cffffffffffb111fffc1111111cfff111bfffb111111111bfff
        ffb111111111bfffb111fffc1111111111dfffffffffff111dfffb111111dfffc111cffffffffffb111fffc1111111cfff111bfffb111111111bfff
        ffb111111111bfffb111fffc1111111111dfffffffffff111dfffb111111dfffc111cffffffffffb111fffc1111111cfff111bfffb111111111bfff
        ffb11bbbb111dcccbbbbccccbbbbbbbbbbbcccccccccccbbbbcccd111bbbbcccb111bccccccccccd111bccb1111111cfff111bfffb111111111bfff
        ffb11cfffd111111cfff111dfffffffffff11111111111fffc1111111ffff111111111111111111111111111111111cfff111bfffb111111111bfff
        ffb11cfffd111111cfffd11dfffffffffff11111111111fffc1111111ffff111111111111111111111111111111111cfff111bfffb111111111bfff
        ffb11cfffd111111cfffd11dfffffffffff11111111111fffc1111111ffff111111111111111111111111111111111cfff111bfffb111111111bfff
        ffb11cfffcccb111cfffccccddddddddddbcccb1111111dddd111bcccffff111bccccccc11111111111111dcccb111dddbccccddd1111111111bfff
        ffb11cffffffc111cffffffc1111111111dfffc11111111111111cfffffff111bfffffff11111111111111dfffb111111dfffc1111111111111bfff
        ffb11cffffffc111cffffffc1111111111dfffc11111111111111cfffffff111bfffffff11111111111111dfffb111111dfffc1111111111111bfff
        ffb11cffffffc111cffffffc1111111111dfffc11111111111111cfffffff111bfffffff11111111111111dfffb111111dfffc1111111111111bfff
        ffb11cffffffffffb111fffc111bfffffff111bfffb111fffc1111111111dfffffffd111fffffffffffd11dfffffffd11111111111111111111bfff
        ffb11cffffffffffb111fffc111bfffffff111bfffb111fffc1111111111dfffffffd111fffffffffffd11dfffffffd11111111111111111111bfff
        ffb11cffffffffffb111fffc111bfffffff111bfffb111fffc1111111111dfffffffd111fffffffffffd11dfffffffd11111111111111111111bfff
        ffb11cffffffffffcbbbccccbbbbccccccc111dcccd111ccccbbbd111dbbbcccccccd111ccccccccccc111dfffffffbbbbbbbbbbbbbbb111111bfff
        ffb11cffffffffffffff111dfffb111111111111111111111dfffb111ffff1111111111111111111111111dffffffffffffffffffffff111111bfff
        ffb11cffffffffffffff111dfffb111111111111111111111dfffb111ffff1111111111111111111111111dffffffffffffffffffffff111111bfff
        ffb11cffffffffffffff111dfffc111111111111111111111dfffb111ffff1111111111111111111111111dffffffffffffffffffffff111111dfff
        ffb11cffffffffffcbbbccccfffccccd111111dcccd111ccccbbbbcccffffcccb1111111cccccccccccccccfffffffffffbbbcfffffffcccb11bfff
        ffb11cffffffffffb111fffffffffffd111111bfffb111fffc111cffffffffffc1111111ffffffffffffffffffffffffff111bffffffffffc11bfff
        ffb11cffffffffffb111fffffffffffd111111bfffb111fffc111cffffffffffc1111111ffffffffffffffffffffffffff111bffffffffffc11bfff
        ffb11cffffffffffb111fffffffffffd111111bfffb111fffc111cffffffffffc1111111ffffffffffffffffffffffffff111bffffffffffc11bfff
        ffb111dddddddddd1111ddddddddddd111dfffffffb111fffc1111dddffffdddbfffd111dddddddcfffdddddddddddcfff111bfffbdddfffc11bfff
        ffb1111111111111111111111111111111dfffffffb111fffc1111111ffff111bfffd1111111111cfffd1111111111cfff111bfffb11dfffc11bfff
        ffb1111111111111111111111111111111dfffffffb111fffc1111111ffff111bfffd1111111111cfffd1111111111cfff111bfffb11dfffc11bfff
        ffb11dddddddddddddddddddddddddd111dfffffffbdddfffc1111111ffff111bfffd1111111dddcfffd111dddd111cfffdddbcccd111cccc11bfff
        ffb11cfffffffffffffffffffffffffd11dffffffffffffffc1111111ffff111bfffd111111bfffffffd11dfffb111cffffffc1111111111111bfff
        ffb11cfffffffffffffffffffffffffd11dffffffffffffffc1111111ffff111bfffd111111bfffffffd11dfffb111cffffffc1111111111111bfff
        ffb11cfffffffffffffffffffffffffd11dffffffffffffffc1111111ffff111bfffd111111bfffffffd11dfffb111cffffffc1111111111111bfff
        ffb11cfffcbbbbbbbbbbbbbbbbbcfffd11dfffffffcbbbfffc1111111ffffcbbcfffcbbb111bfffffffd11dbbbd111cfffbbbbbcbd111111111bfff
        ffb11cfffd11111111111111111bfffd11dfffffffb111fffc1111111fffffffffffffff111bfffffffd1111111111cfff111bfffb111111111bfff
        ffb11cfffd11111111111111111bfffd11dfffffffb111fffc1111111fffffffffffffff111bfffffffd1111111111cfff111bfffb111111111bfff
        ffb11cfffd11111111111111111bfffd11dfffffffb111fffc1111111fffffffffffffff111bfffffffd1111111111cfff111bfffb111111111bfff
        ffb11cfffd11dccccccccccc111bfffd11dffffffffcccdddd111bcccfffffffffffbddd1111dddcfffcccccccccccffffccccdddcccc111111bfff
        ffb11cfffd11bffffffffffc111bfffd11dfffffffffff1111111cffffffffffffffd1111111111cfffffffffffffffffffffc111cfff111111bfff
        ffb11cfffd11dffffffffffc111bfffd11dfffffffffff1111111cffffffffffffffd1111111111cfffffffffffffffffffffc111cfffd11111bfff
        ffb11cfffd11bffffffffffc111bfffd11dfffffffffff1d11111bffffffffffffffd111dd11dddcfffffffffffffffffffffcd1dcfff111111bfff
        ffb11cfffd11bffffffffffc111bfffd11dfffc111cffffffc1111111111dfffc1111111fffffffb111fffc111bfffd111fffffffffffd11111bfff
        ffb11cfffd11bffffffffffc111bfffd11dfffc111cffffffc1111111111dfffc1111111fffffffb111fffc111bfffd111fffffffffffd11111dfff
        ffb11cfffd11bffffffffffc111bfffd11dfffc111cffffffc1111111111dfffc1111111fffffffb111fffc111bfffd11dfffffffffff111111bfff
        ffb11cfffd11bffffffffffc111bfffd111cccbbbbcffffffcbbbbbbbbbbbfffcbbbbbbbcccccccd111bcccbbbcfffd111fffffffffffbbbb11bfff
        ffb11cfffd11bffffffffffc111bfffd111111bfffffffffffffffffffffffffffffffff11111111111111dfffffffd111ffffffffffffffc11bfff
        ffb11cfffd11bffffffffffc111bfffd111111bfffffffffffffffffffffffffffffffff11111111111111dfffffffd111ffffffffffffffc11bfff
        ffb11cfffd11bffffffffffc111bfffd111111bfffffffffffffffffffffffffffffffff11111111111111dfffffffd111ffffffffffffffc11bfff
        ffb11cfffd111bbbbbbbbbbd111bfffd111111dbbbbbbbbbbbbbbcffffffffffcbbbbbbbcccb1111111111dfffcbbb111dfffcbbbcfffbbbd11bfff
        ffb11cfffd11111111111111111bfffd111111111111111111111cffffffffffc1111111fffc1111111111dfffb111111dfffc111cfffd11111bfff
        ffb11cfffd11111111111111111bfffd111111111111111111111cffffffffffc1111111fffc1111111111dfffb1111111fffc111cfffd11111bfff
        ffb11cfffddddddddddddddddddcfffd111ddd11111ddd1111111bffffffffffcdddddddfffcddd1111ddddfffbdddddddfffc111cffc111111bfff
        ffb11cfffffffffffffffffffffffffd11dfffc111cfff11111111d1d1d1dffffffffffffffffffb111cfffffffffffffffffc1111dd1111111bfff
        ffb11cfffffffffffffffffffffffffd11dfffc111cfff11111111111111dffffffffffffffffffb111ffffffffffffffffffc1111111111111bfff
        ffb11cfffffffffffffffffffffffffd11dfffc111cfff11111111111111dffffffffffffffffffb111ffffffffffffffffffc1111111111111bfff
        ffb11bcccccccccccccccccccccccccd111cccb111bccc11111111111111dccccccccccccccccccd111ccccccccccccccccccb1111111111111bfff
        ffb1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111bfff
        ffb1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111bfff
        ffcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcfff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `, SpriteKind.qr)
    pause(200)
    pauseUntil(() => controller.A.isPressed())
    // 기존 메뉴 제거
    sprites.destroy(qrcode)
    menu()
}
function hasNextLevel () {
    return currentLevel != levelCount
}
function spawnGoals () {
    for (let value7 of tiles.getTilesByType(assets.tile`tile5`)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(coin, value7)
        animation.attachAnimation(coin, coinAnimation)
        animation.setAction(coin, ActionKind.Idle)
        tiles.setTileAt(value7, assets.tile`tile0`)
    }
}
let coin: Sprite = null
let playerStartLocation: tiles.Location = null
let flier: Sprite = null
let bumper: Sprite = null
let currentLevel = 0
let levelCount = 0
let gravity = 0
let mainCrouchRight: animation.Animation = null
let mainCrouchLeft: animation.Animation = null
let mainJumpRight: animation.Animation = null
let mainJumpLeft: animation.Animation = null
let mainRunRight: animation.Animation = null
let mainRunLeft: animation.Animation = null
let flierIdle: animation.Animation = null
let flierFlying: animation.Animation = null
let myMenu: miniMenu.MenuSprite = null
let mainIdleRight: animation.Animation = null
let mainIdleLeft: animation.Animation = null
let qrcode: Sprite = null
let B_Trigger = false
let game_Trigger = false
let ismymanu = false
let doubleJumpSpeed = 0
let coinAnimation: animation.Animation = null
let continu = ""
let invincibilityPeriod = 0
let pixelsToMeters = 0
let hero: Sprite = null
let canDoubleJump = false
let heroFacingLeft = false
let intro_1 = sprites.create(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffcceecffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffce444444efffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffc444444444efffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffe4444444444ffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffff444444444444ffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffff444444444444effffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffff4444444444444fffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff4444444444444efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffe4444444444444ffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffc4444444444444effffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffff44444444444444fffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffcee4444444444efffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffff77777777fffeee444cffffffccfffffffffffffffffff
    ffffffffffffffffffffffffffffffff777777777777777777ffcefffee444444effffffffffffffff
    fffffffffffffffffffffffffffff77777777777777777777777fffc44444444444fffffffffffffff
    ffffffffffffffffffffffffff77777777777777777777777777777ffe444444444fffffffffffffff
    ffffffffffffffffffffffff777777777777777777777777777777777fce444444ffffffffffffffff
    ffffffffffffffffffffff7777777777777777777777777777777777777fc4444cffffffffffffffff
    fffffffffffffffffffff777777777777777777777777777777777777777ff44efffffffffffffffff
    fffffffffffffffffff7777777777777777777777777777777777777777777feffffffffffffffffff
    ffffffffffffffffff777777777777777777777777777777777777777777777fffffffffffffffffff
    fffffffffffffffff77777777777777777777777777777777777777777777777ffffffffffffffffff
    ffffffffffffffff7777777777777777777777777777777777777777777777777fe4ffffffffffffff
    fffffffffffffff777777777777777777777777777777777777777777777777777fe4effffffffffff
    ffffffffffffff77777777777777777777777777777777777777777777777777777f44ffffffffffff
    ffffffffffffff77777777777777777777777777777777777777777777777777777fceffffffffffff
    fffffffffffff7777777777777777777777777777777777777777777777777777777ffffffffffffff
    ffffffffffff777777777777777777777777777777777777777777777777777777777fffffffffffff
    ffffffffffff777777777777777777777777777777777777777777777777777777777fffffffffffff
    fffffffffff77777777777777777777777777777777777777777777777777777777777ffffffffffff
    fffffffffff77777777777777777777777777777777777777777777777777777777777ffffffffffff
    fffffffffff77777777777777777777777777777777777777777777777777777777777ffffffffffff
    ffffffffff7777777777777777777777777777777777777777777777777777777777777fffffffffff
    ffffffffff7777777777777777777777777777777777777777777777777777777777777fffffffffff
    ffffffffff77777777ffff77777777777777777777777777ffff7777777777777777777fffffffffff
    ffffffffff77777777ffffff7777777777777777777777ffffff7777777777777777777fffffffffff
    fffffffff77777777777ffff7777777777777777777777ffff777777777777777777777fffffffffff
    fffffffff777777777777777777777777777777777777777777777777777777777777777ffffffffff
    fffffffff777777777777777777777777777777777777777777777777777777777777777ffffffffff
    fffffffff777777777777777777777777777777777777777777777777777777777777777ffffffffff
    fffffffff77777777777ff77777777777777777777777777ff7777777777777777777777ffffffffff
    fffffffff777777777fffff77777777777777777777777ffffff77777777777777777777ffffffffff
    fffffffff77777777ff11fff7777777777777777777777f11fff77777777777777777777ffffffffff
    fffffffff77777777ff11fff777777777777777777777ff11ffff7777777777777777777ffffffffff
    fffffffff77777777fffffff7777777777f7777777777ffffffff777777777777777777fffffffffff
    ffffffffff7777777fffffff77777777fffff777777777ffffff7777777777777777777fffffffffff
    ffffffffff77777777fffff7777777ffff7ffff7777777ffffff7777777777777777777fffffffffff
    ffffffffff777777777fff7777777fff77777fff77777777ff777777777777777777777fffffffffff
    fffffffffff77777777777777777777777777777777777777777777777777777777777ffffffffffff
    fffffffffff77777777777777777777777777777777777777777777777777777777777ffffffffffff
    fffffffffff77777777777777777777777777777777777777777777777777777777777ffffffffffff
    ffffffffffff7777777777777777777777777777777777777777777777777777777777ffffffffffff
    ffffffffffff777777777777777777777777777777777777777777777777777777777fffffffffffff
    fffffffffffff77777777777777777777777777777777777777777777777777777777fffffffffffff
    fffffffffffff7777777777777777777777777777777777777777777777777777777ffffffffffffff
    ffffffffffffff77777777777777777777777777777777777777777777777777777fffffffffffffff
    fffffffffffffff777777777777777777777777777777777777777777777777777ffffffffffffffff
    ffffffffffffffff77777777777777777777777777777777777777777777777777ffffffffffffffff
    ffffffffffffffff7777777777777777777777777777777777777777777777777fffffffffffffffff
    ffffffffffffffffff777777777777777777777777777777777777777777777fffffffffffffffffff
    fffffffffffffffffff7777777777777777777777777777777777777777777ffffffffffffffffffff
    ffffffffffffffffffff77777777777777777777777777777777777777777fffffffffffffffffffff
    fffffffffffffffffffff777777777777777777777777777777777777777ffffffffffffffffffffff
    ffffffffffffffffffffffff777777777777777777777777777777777fffffffffffffffffffffffff
    ffffffffffffffffffffffffff77777777777777777777777777777fffffffffffffffffffffffffff
    fffffffffffffffffffffffffffff777777777777777777777777fffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffff77777777777777ffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `, SpriteKind.intro)
let intro_2 = sprites.create(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffeeeeffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffff444444444ffffffffffffffffffffffffff
    fffffffffffffffffffff66fffffffffffffffffffffc44444444444ffffffffffffffffffffffffff
    fffffffffffffffffffff99ffffffffffffffffffff444444444444fffffffffffffffffffffffffff
    fffffffffffffffffffff69fffffffffffffffffff4444444444444fffffffffffffffffffffffffff
    fffffffffffffffffffff699fffffffffffffffff4444444444444cfffffffffffffffffffffffffff
    ffffffffffffffffffffff69ffffffffffffffff44444444444444ffffffffffffffffffffffffffff
    ffffffffffffffffffffff999ffffffffffffff44444444444444cffffffffffffffffffffffffffff
    fffffffffffffffffffffff99fffffffffffff444444444444444fffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffff444444444444444ffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffc444444444444444ffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffff4444444fffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffe4fffffffffffffffffffffffffffffff
    ffffffffffff9ffffffffffffffffffff777777777777777ffffff44444444ffffffffffffffffffff
    ffffffffffff99ffffffffffffff777777777777777777777777fffe44444444ffffffffffffffffff
    ffffffffffff696fffffffffff7777777777777777777777777777fffe444444ffffffffffffffffff
    fffffffffffff9ffffffffff777777777777777777777777777777777ff4444cffffffffffffffffff
    ffffffffffffffffffffff777777777777777777777777777777777777ffc4efffffffffffffffffff
    ffffffffffffffffffff7777777777777777777777777777777777777777ffffffffffffffffffffff
    fffffffffffffffffff777777777777777777777777777777777777777777fffffffffffffffffffff
    ffffffffffffffffff777777777777777777777777777777777777777777777fffffffffffffffffff
    ffffffffffffffff777777777777777777777777777777777777777777777777feffffffffffffffff
    ff99fffffffffff77777777777777777777777777777777777777777777777777fe4ffffffffffffff
    ff6996ffffffff7777777777777777777777777777777777777777777777777777feefffffffffffff
    fff999ffffffff77777777777777777777777777777777777777777777777777777fcfffffffff6fff
    fffffffffffff777777777777777777777777777777777777777777777777777777fffffffff999fff
    ffffffffffff77777777777777777777777777777777777777777777777777777777fffffff6996fff
    fffffffffff7777777777777777777777777777777777777777777777777777777777fffff999fffff
    fffffffffff7777777777777777777777777777777777777777777777777777777777fffff6fffffff
    ffffffffff777777777777777777777777777777777777777777777777777777777777ffffffffffff
    ffffffffff777777777777777777777777777777777777777777777777777777777777ffffffffffff
    ffffffffff7777777777777777777777777777777777777777777777777777777777777fffffffffff
    fffffffff77777777777777777777777777777777777777777777777777777777777777fffffffffff
    fffffffff77777777777777777777777777777777777777777777777777777777777777fffffffffff
    fffffffff777777777777777777777777777777777777777777777777777777777777777ffffffffff
    ffffffff7777777777777777777777777777777777777777777777777777777777777777ffffffffff
    ffffffff77777777777777777777777777777777777777777777777777777777777777777fffffffff
    ffffffff77777777777777777777777777777777777777777777777777777777777777777fffffffff
    ffffffff77777777777777777777777777777777777777777777777777777777777777777fffffffff
    ffffffff7777777777777777777777777777777777777777ec77777777777777777777777fffffffff
    ffffffff77777777cb7777777777777777777777777777bffb77777777777777777777777fffffffff
    ffffffff77777777cfc77777777777777777777777777ffc7777777777777777777777777fffffffff
    ffffffff7777777777ffb77777777777777777777777ff777777777777777777777777777fffffffff
    ffffffff77777777777cfc777777777777777777777777777777777777777777777777777fffffffff
    ffffffff77777777777777777777777777777777777777777777777777777777777777777fffffffff
    ffffffff77777777777777777777777777777777777777777777777777777777777777777fffffffff
    ffffffff77777777777777777777777777777777777777777777777777777777777777777fffffffff
    ffffffff77777777777777777777777777777777777777cffc7777777777777777777777ffffffffff
    fffffffff7777777cccfc777777777777777777777777f111ff777777777777777777777ffffffffff
    fffffffff777777cd11cf777777777777777777777777f111ff77777777777777777777fffffffffff
    fffffffff777777fb1dfff777777777b7777777777777ffffffb7777777777777777777fffffffffff
    ffffffffff77777fffffff77777777bffc77777777777ffffff77777777777777777777fffffffffff
    ffffffffff77777ffffffb7777777cfccfffb77777777fffffc7777777777777777777ffffffffffff
    fffffffffff77777fffff7777777ffe33bbffc77777777bffb77777777777777777777ffffffffffff
    fffffffffff777777ccb77777777fc333333ff7777777777777777777777777777777fffffffffffff
    ffffffffffff7777777777777777cfb33333bf7777777777777777777777777777777fffffffffffff
    ffffffffffff77777777777777777ff333333f777777777777777777777777777777ffffffffffffff
    fffffffffffff77777777777777777fc33333f77777777777777777777777777777fffffffffffffff
    ffffffffffffff7777777777777777cfe3333f77777777777777777777777777777fffffffffffffff
    fffffffffffffff7777777777777777bff33ff777777777777777777777777777fffffffffffffffff
    ffffffffffffffff7777777777777777bffffb777777777777777777777777777fffffffffffffffff
    fffffffffffffffff7777777777777777777777777777777777777777777777fffffffffffffffffff
    ffffffffffffffffff77777777777777777777777777777777777777777777ffffffffffffffffffff
    ffffffffffffffffffff77777777777777777777777777777777777777777fffffffffffffffffffff
    fffffffffffffffffffff77777777777777777777777777777777777777fffffffffffffffffffffff
    fffffffffffffffffffffff7777777777777777777777777777777777fffffffffffffffffffffffff
    fffffffffffffffffffffffff777777777777777777777777777777fffffffffffffffffffffffffff
    fffffffffffffffffffffffffffff7777777777777777777777fffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffff7777777777777fffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `, SpriteKind.intro)
let intro_3 = sprites.create(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffceeecffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444ffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffe444444444ffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffe4444444444cffffffffffffffffff
    fffffffffffffffffffffffffffffffffffff77777fffffffff444444444444fffffffffffffffffff
    fffffffffffffffffffffffffffffff77777777777777777ffffe444444444ffffffffffffffffffff
    fffffffffffffffffffffffffff7777777777777777777777777ffe444444effffffffffffffffffff
    ffffffffffffffffffffffff777777777777777777777777777777ffce444fffffffffffffffffffff
    ffffffffffffffffffffff7777777777777777777777777777777777ffc4efffffffffffffffffffff
    ffffffffffffffffffff77777777777777777777777777777777777777ffffffffffffffffffffffff
    fffffffffffffffffff77777777777777777777777777777777777777777ffffffffffffffffffffff
    fffffffffffffffff77777777777777777777777777777777777777777777ffeefffffffffffffffff
    ffffffffffffffff7777777777777777777777777777777777777777777777ffe4efffffffffffffff
    fffffffffffffff777777777777777777777777777777777777777777777777ffe44ffffffffffffff
    ffffffffffffff777777777777777777777777777777777777777777777777777fe4efffffffffffff
    fffffffffffff77777777777777777777777777777777777777777777777777777feefffffffffffff
    fffffffffffff777777777777777777777777777777777777777777777777777777fcfffffffffffff
    ffffffffffff77777777777777777777777777777777777777777777777777777777ffffffffffffff
    fffffffffff777777777777777777777777777777777777777777777777777777777ffffffffffffff
    fffffffffff7777777777777777777777777777777777777777777777777777777777fffffffffffff
    ffffffffff777777777777777777777777777777777777777777777777777777777777ffffffffffff
    ffffffffff777777777777777777777777777777777777777777777777777777777777ffffffffffff
    fffffffff77777777777777777777777777777777777777777777777777777777777777fffffffffff
    fffffffff77777777777777b77777777777777777777777777777777777777777777777fffffffffff
    ffffffff77777777777777bffc7777777777777777777777777777777777777777777777ffffffffff
    ffffffff777777777777777bcffb77777777777777777777777777777777777777777777ffffffffff
    ffffffff77777777777777777bcfc77777777777777777777777777777777777777777777fffffffff
    ffffffff7777777777777777777bb77777777777777777777777777777777777777777777fffffffff
    fffffff777777777777777777777777777777777777777777777777777777777777777777fffffffff
    fffffff777777777777777777777777777777777777777777777777777777777777777777fffffffff
    fffffff777777777777777cb7777777777777777777777777777777bbb7777777777777777ffffffff
    fffffff777777777777777ffb777777777777777777777777777ffffffb777777777777777ffffffff
    fffffff7777777777777777cfc77777777777777777777777777ccccbb7777777777777777ffffffff
    fffffff77777777777777777cfc77777777777777777777777777777777777777777777777ffffffff
    fffffff77777777777777777bffc7777777777777777777777777777777777777777777777ffffffff
    fffffff77777777777777cfffffc7777777777777777777777777777777777777777777777ffffffff
    fffffff7777777777777bcccbb777777777777777777777777777777777777777777777777ffffffff
    fffffff77777777777777b77777777777b77777777777777777bcccb777777777777777777ffffffff
    ffffffff777777777777777777777777bfcbbbbb7777777777bc11ffb77777777777777777ffffffff
    ffffffff777777777777777777777777bfffffffb777777777c111ffc7777777777777777fffffffff
    ffffffff777777777777777777777777bf333333fb7777777bcffffff7777777777777777fffffffff
    ffffffff7777777777777777777777777f3333333fcb777777cfffffc7777777777777777fffffffff
    fffffffff777777777777777777777777bf3333333fc777777cfffffb7777777777777777fffffffff
    fffffffff7777777777777777777777777cf33333ffb7777777cfffc77777777777777777fffffffff
    fffffffff77777777777777777777777777cfffffcb7777777777b777777777777777777ffffffffff
    ffffffffff77777777777777777777777777bbbbb7777777777777777777777777777777ffffffffff
    fffffffffff777777777777777777777777777777777777777777777777777777777777fffffffffff
    fffffffffff777777777777777777777777777777777777777777777777777777777777fffffffffff
    ffffffffffff7777777777777777777777777777777777777777777777777777777777ffffffffffff
    ffffffffffff7777777777777777777777777777777777777777777777777777777777ffffffffffff
    fffffffffffff77777777777777777777777777777777777777777777777777777777fffffffffffff
    ffffffffffffff7777777777777777777777777777777777777777777777777777777fffffffffffff
    fffffffffffffff77777777777777777777777777777777777777777777777777777ffffffffffffff
    ffffffffffffffff777777777777777777777777777777777777777777777777777fffffffffffffff
    fffffffffffffffff7777777777777777777777777777777777777777777777777ffffffffffffffff
    fffffffffffffffffff7777777777777777777777777777777777777777777777fffffffffffffffff
    ffffffffffffffffffff77777777777777777777777777777777777777777777ffffffffffffffffff
    ffffffffffffffffffffff7777777777777777777777777777777777777777ffffffffffffffffffff
    ffffffffffffffffffffffff7777777777777777777777777777777777777fffffffffffffffffffff
    ffffffffffffffffffffffffff777777777777777777777777777777777fffffffffffffffffffffff
    ffffffffffffffffffffffffffff77777777777777777777777777777fffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffff777777777777777777777ffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffff77777777777fffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `, SpriteKind.intro)

//start
game.showLongText("Hi, My name is 299.", DialogLayout.Bottom)
sprites.destroy(intro_1, effects.none, 30)
game.showLongText("I'm pal of EQSTLab.", DialogLayout.Bottom)
sprites.destroy(intro_2, effects.none, 30)
game.showLongText("Nice to meet you :)", DialogLayout.Bottom)
sprites.destroy(intro_3, effects.none, 30)
menu()