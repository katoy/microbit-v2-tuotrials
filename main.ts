let index = 0
let arrows_array = [
images.arrowImage(ArrowNames.North),
images.createImage(`
    . . # # #
    . . . # #
    . . # . #
    . # . . .
    . # . . .
    `),
images.arrowImage(ArrowNames.NorthEast),
images.createImage(`
    . . # # #
    . . . # #
    . . # . #
    # # . . .
    . . . . .
    `),
images.arrowImage(ArrowNames.East),
images.createImage(`
    . . . . .
    # # . . .
    . . # . #
    . . . # #
    . . # # #
    `),
images.arrowImage(ArrowNames.SouthEast),
images.createImage(`
    . # . . .
    . # . . .
    . . # . #
    . . . # #
    . . # # #
    `),
images.arrowImage(ArrowNames.South),
images.createImage(`
    . . . # .
    . . . # .
    # . # . .
    # # . . .
    # # # . .
    `),
images.arrowImage(ArrowNames.SouthWest),
images.createImage(`
    . . . . .
    . . . # #
    # . # . .
    # # . . .
    # # # . .
    `),
images.arrowImage(ArrowNames.West),
images.createImage(`
    # # # . .
    # # . . .
    # . # . .
    . . . # #
    . . . . .
    `),
images.arrowImage(ArrowNames.NorthWest),
images.createImage(`
    # # # . .
    # # . . .
    # . # . .
    . . . # .
    . . . # .
    `)
]
basic.forever(function () {
    index = Math.round(input.compassHeading() / 22.5) % 16
    arrows_array[index].showImage(0)
    basic.pause(100)
})
