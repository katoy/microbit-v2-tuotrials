# 102-03 得点表示 (その2)
前のプログラムでは全部の拍子をたたいたら、100点になってしまいます。  
音符が無い箇所で叩いたら減点されるようにしてみました。
```blocks
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MES_ALERT_EVT_ALARM2, function () {
    作曲()
})
// 新しい小節を譜面の最後に追加する
function 作曲 () {
    if (譜面.length < 5) {
        譜面.push([randint(0, 1), randint(0, 1), randint(0, 1), randint(0, 1)])
    }
}
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    tone1 = 1
    打数 += 1
    music.playTone(880, music.beat(BeatFraction.Sixteenth))
    basic.pause(100)
    tone1 = 0
})
// 譜面を画面に表示しなおす
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MES_ALERT_EVT_ALARM3, function () {
    dummy = 譜面.shift()
    譜面表示()
})
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
input.onButtonPressed(Button.B, function () {
    playing = !(playing)
})
function 譜面表示 () {
    if (音符数 >= 10) {
        playing = false
        if (音符数 < 打数) {
            得点 = 得点 - (打数 - 音符数)
        }
        game.setScore(Math.floor(100 * 得点 / 音符数))
        game.gameOver()
    }
    for (let index = 0; index <= 3; index++) {
        for (let index_1 = 0; index_1 <= 3; index_1++) {
            led.plotBrightness(index_1, index + 1, 200 * 譜面[index][index_1])
        }
    }
}
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MES_ALERT_EVT_ALARM1, function () {
    basic.pause(tone_offset)
    if (1 == 譜面[0][x]) {
        tone0 = 1
        音符数 += 1
        music.playTone(440, music.beat(BeatFraction.Sixteenth))
        basic.pause(200)
        tone0 = 0
    } else {
        music.playTone(220, music.beat(BeatFraction.Sixteenth))
    }
})
let v = 0
let x = 0
let dummy: number[] = []
let playing = false
let 譜面: number[][] = []
let tone_offset = 0
let 得点 = 0
let 打数 = 0
let 音符数 = 0
let tone1 = 0
let tone0 = 0
tone0 = 0
tone1 = 0
音符数 = 0
打数 = 0
得点 = 0
tone_offset = 10
let テンポ = 60000 / 120
music.setTempo(テンポ)
譜面 = []
譜面.push([0, 0, 0, 0])
譜面.push([0, 0, 1, 0])
譜面.push([1, 0, 1, 0])
譜面.push([1, 0, 0, 0])
譜面.push([1, 0, 0, 0])
playing = true
譜面表示()
// メトロノーム
control.inBackground(function () {
    while (true) {
        if (!(playing)) {
            basic.pause(500)
        } else {
            led.plotBrightness(x, 0, 0)
            if (x == 2) {
                control.raiseEvent(
                EventBusSource.MICROBIT_ID_BUTTON_B,
                EventBusValue.MES_ALERT_EVT_ALARM2
                )
            }
            if (x == 3) {
                x = 0
                control.raiseEvent(
                EventBusSource.MICROBIT_ID_BUTTON_B,
                EventBusValue.MES_ALERT_EVT_ALARM3
                )
            } else {
                x += 1
            }
            control.raiseEvent(
            EventBusSource.MICROBIT_ID_BUTTON_B,
            EventBusValue.MES_ALERT_EVT_ALARM1
            )
            basic.pause(tone_offset)
            led.plotBrightness(x, 0, 160)
            basic.pause(テンポ - tone_offset)
        }
    }
})
control.inBackground(function () {
    while (true) {
        if (tone0 == 1) {
            v = tone1
            serial.writeValue("v0", v)
            while (tone0 == 1) {
                if (v == 1) {
                    tone0 = 0
                }
                basic.pause(5)
                v = tone1
            }
            if (v == 1) {
                得点 += 1
            } else {
                得点 += -1
            }
        }
        basic.pause(5)
    }
})
```

