# 102 太鼓の名人

A + B ボタンでゲーム開始(再開)です。  
B ボタンで中断します。  
A ボタンが太鼓打ちです。  

一番上の行はメトロノームです。  
2 行目が楽譜です。 1 行は１小節 (4 拍分) を表しています。    
1 小節分が終わると、楽譜が上にスクロールします。つまり 2 行目が常に今 演奏する小節になっています。  

```blocks
 // 先頭の小節を削除してから、譜面を画面に表示しなおす
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
    music.playTone(880, music.beat(BeatFraction.Eighth))
})
// 先頭の小節を削除してから、譜面を画面に表示しなおす
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
    for (let index = 0; index <= 3; index++) {
        for (let index_1 = 0; index_1 <= 3; index_1++) {
            led.plotBrightness(index_1, index + 1, 200 * 譜面[index][index_1])
        }
    }
}
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MES_ALERT_EVT_ALARM1, function () {
    if (1 == 譜面[0][x]) {
        music.playTone(440, music.beat(BeatFraction.Sixteenth))
    } else {
        music.playTone(220, music.beat(BeatFraction.Sixteenth))
    }
})
let x = 0
let dummy: number[] = []
let playing = false
let 譜面: number[][] = []
let テンポ = 60000 / 120
music.setTempo(テンポ)
譜面 = []
譜面.push([0, 0, 0, 0])
譜面.push([1, 0, 0, 0])
譜面.push([1, 0, 1, 0])
譜面.push([1, 0, 0, 0])
譜面.push([1, 1, 1, 1])
playing = true
譜面表示()
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
            led.plotBrightness(x, 0, 160)
            basic.pause(テンポ)
        }
    }
})

```

