# 101 ピンポンゲーム

A　ボタン、B ボタンで一番下にあるボードが左右に動きます。  
bicro:bit 本体を揺さぶるとリセット（ゲーム再開)します。  
ボーの角でボールを跳ね返した場合は得点２で高いラの音が鳴ります。  
普通にボールを跳ね返した場合は得点１中央のラの音が鳴ります。  　

上でボールが跳ね返るときは、時々、跳ね返る角度が変わります。(５回に１回程度)  
ボードでボールを無ね返すごとにだんだんとボールのスピートが速くなります。 (5 %アップ)  
あるスピートを超えると、最初のボールの速さに戻ります。  

```blocks
function 得点アップ (値: number) {
    score += 値
    if (値 == 1) {
        music.playTone(440, music.beat(BeatFraction.Eighth))
    } else {
        music.playTone(880, music.beat(BeatFraction.Eighth))
    }
    インターバル = インターバル * 0.95
    if (インターバル < 50) {
        music.startMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once)
        インターバル = 700
    }
}
input.onButtonPressed(Button.A, function () {
    if (board_left.get(LedSpriteProperty.X) > 0) {
        board_left.change(LedSpriteProperty.X, -1)
    }
    if (board_right.get(LedSpriteProperty.X) > 1) {
        board_right.change(LedSpriteProperty.X, -1)
    }
})
input.onGesture(Gesture.Shake, function () {
    control.reset()
})
input.onButtonPressed(Button.B, function () {
    if (board_left.get(LedSpriteProperty.X) < 3) {
        board_left.change(LedSpriteProperty.X, 1)
    }
    if (board_right.get(LedSpriteProperty.X) < 4) {
        board_right.change(LedSpriteProperty.X, 1)
    }
})
let y = 0
let x = 0
let インターバル = 0
let board_right: game.LedSprite = null
let board_left: game.LedSprite = null
board_left = game.createSprite(3, 4)
board_right = game.createSprite(4, 4)
let ball = game.createSprite(3, 1)
let dx = 1
let dy = 1
let score = 0
インターバル = 700
control.inBackground(function () {
    while (true) {
        x = ball.get(LedSpriteProperty.X)
        y = ball.get(LedSpriteProperty.Y)
        if (y > 0 && y == 3 && (x == board_left.get(LedSpriteProperty.X) || x == board_right.get(LedSpriteProperty.X))) {
            dy = dy * -1
            得点アップ(1)
        } else {
            if (x == 0 || x == 4) {
                dx = dx * -1
            }
            if (y == 0) {
                dy = dy * -1
                if (randint(0, 5) == 0) {
                    dx = randint(0, 3) - 1
                }
            }
            if (y == 4) {
                dy = dy * -1
                if (x == board_left.get(LedSpriteProperty.X) || x == board_right.get(LedSpriteProperty.X)) {
                    dx = dx * -1
                    得点アップ(2)
                } else {
                    music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
                    dx = dx * -1
                    game.setScore(score)
                    game.gameOver()
                }
            }
        }
        ball.change(LedSpriteProperty.X, dx)
        ball.change(LedSpriteProperty.Y, dy)
        basic.pause(インターバル)
    }
})

```
