let index = 0
let arrows_array = [
images.arrowImage(ArrowNames.North),
images.arrowImage(ArrowNames.NorthEast),
images.arrowImage(ArrowNames.East),
images.arrowImage(ArrowNames.SouthEast),
images.arrowImage(ArrowNames.South),
images.arrowImage(ArrowNames.SouthWest),
images.arrowImage(ArrowNames.West),
images.arrowImage(ArrowNames.NorthWest)
]
basic.forever(function () {
    index = Math.round(input.compassHeading() / 45) % 8
    arrows_array[index].showImage(0)
    basic.pause(100)
})
