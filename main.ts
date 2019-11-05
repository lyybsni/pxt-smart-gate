function Stop () {
    Motor = 0
}
function Open () {
    if (!(Opened)) {
        Makercloud_Kitten.publishKeyValueToTopic(topic, "open", convertToText(1))
        basic.showIcon(IconNames.Yes)
        Motor = -60
        OpenTimer = 3001
        Opened = true
    }
}
input.onButtonPressed(Button.B, function () {
    Open()
})
powerbrick.RfidPresent(function () {
    if (powerbrick.RfidUUID() == GroupRFID) {
        Open()
    } else {
        basic.showIcon(IconNames.No)
    }
})
function TimeCollaspe () {
    timer += 100
    if (OpenTimer == 1) {
        Stop()
        OpenTimer = 0
    } else if (OpenTimer > 0) {
        OpenTimer += 0 - 100
    }
    if (CloseTimer == 1) {
        Stop()
        CloseTimer = 0
    } else if (CloseTimer > 0) {
        CloseTimer += 0 - 100
    }
}
function Close () {
    if (Opened) {
        Makercloud_Kitten.publishKeyValueToTopic(topic, "open", convertToText(-1))
        Motor = 80
        CloseTimer = 3001
        basic.showIcon(IconNames.Happy)
        Opened = false
    }
}
input.onButtonPressed(Button.A, function () {
    Open()
})
let timer = 0
let GroupRFID = ""
let Motor = 0
let CloseTimer = 0
let OpenTimer = 0
let topic = ""
let Opened = false
Opened = false
let WiFiName = "xuan"
let WiFiPassword = "jiaobaba"
topic = "KQULH1C4"
Makercloud_Kitten.configRxTxPwbrick(Makercloud_Kitten.SerialPorts.PORT2)
Makercloud_Kitten.init()
Makercloud_Kitten.setupWifi(WiFiName, WiFiPassword)
Makercloud_Kitten.connectMqtt()
OpenTimer = 0
CloseTimer = 0
Motor = 0
GroupRFID = "aa7478fb"
basic.forever(function () {
    powerbrick.RfidProbe()
    if (powerbrick.Ultrasonic(powerbrick.Ports.PORT1) < 5) {
        Close()
    }
    powerbrick.MotorRun(powerbrick.Motors.M1, Motor)
    basic.pause(100)
    TimeCollaspe()
})
