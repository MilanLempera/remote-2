function coordsToDirection (x: number, y: number) {
    if (x > 0) {
        if (y > 0) {
            return ArrowNames.NorthEast
        } else if (y < 0) {
            return ArrowNames.SouthEast
        } else {
            return ArrowNames.East
        }
    } else if (x < 0) {
        if (y > 0) {
            return ArrowNames.NorthWest
        } else if (y < 0) {
            return ArrowNames.SouthWest
        } else {
            return ArrowNames.West
        }
    } else {
        if (y > 0) {
            return ArrowNames.North
        } else if (y < 0) {
            return ArrowNames.South
        }
        return 10
    }
}
function analogToDirection (value: number) {
    return Math.round((value - 516) / 105)
}
function coordsToSpeed (x: number, y: number) {
    return Math.max(Math.abs(x), Math.abs(y))
}
let speed = 0
let yInput = 0
let xInput = 0
let direction = 10
radio.setGroup(1)
basic.forever(function () {
    xInput = analogToDirection(pins.analogReadPin(AnalogPin.P0))
    yInput = analogToDirection(pins.analogReadPin(AnalogPin.P1))
    speed = coordsToSpeed(xInput, yInput)
    radio.sendValue("s", speed)
    direction = coordsToDirection(xInput, yInput)
    radio.sendValue("d", direction)
    basic.showArrow(direction)
})
