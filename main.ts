function readButton () {
    buttonNumber = 0
    buttonValue = pins.analogReadPin(AnalogPin.P2)
    if (buttonValue < 256) {
        buttonNumber = 1
    } else {
        if (buttonValue < 597) {
            buttonNumber = 2
        } else {
            if (buttonValue < 725) {
                buttonNumber = 3
            } else {
                if (buttonValue < 793) {
                    buttonNumber = 4
                } else {
                    if (buttonValue < 836) {
                        buttonNumber = 5
                    } else {
                        if (buttonValue < 938) {
                            buttonNumber = 6
                        }
                    }
                }
            }
        }
    }
}
function analogToDirection (value: number) {
    if (value < 300) {
        return -2
    }
    if (value < 400) {
        return -1
    }
    if (value > 700) {
        return 2
    }
    if (value > 600) {
        return 1
    }
    return 0
}
let lastButtonNumber = 0
let lastYInput = 0
let yInput = 0
let lastXInput = 0
let xInput = 0
let buttonValue = 0
let buttonNumber = 0
let direction = 10
radio.setGroup(1)
basic.forever(function () {
    xInput = analogToDirection(pins.analogReadPin(AnalogPin.P0))
    if (xInput != lastXInput) {
        radio.sendValue("x", xInput)
        lastXInput = xInput
    }
    yInput = analogToDirection(pins.analogReadPin(AnalogPin.P1))
    if (yInput != lastYInput) {
        radio.sendValue("y", yInput)
        lastYInput = yInput
    }
    readButton()
    if (buttonNumber != lastButtonNumber || buttonNumber != 0) {
        radio.sendValue("b", buttonNumber)
        lastButtonNumber = buttonNumber
    }
})
