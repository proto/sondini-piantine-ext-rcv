datalogger.onLogFull(function () {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
input.onButtonPressed(Button.AB, function () {
    basic.showString("RST!")
    datalogger.deleteLog(datalogger.DeleteType.Full)
    basic.showIcon(IconNames.No)
    control.reset()
})
radio.onReceivedString(function (receivedString) {
    id = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    sonda = receivedString
})
radio.onReceivedValue(function (name, value) {
    id = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    basic.showIcon(IconNames.Yes)
    basic.clearScreen()
    serial.writeString("{")
    serial.writeString("\"t\":" + radio.receivedPacket(RadioPacketProperty.Time) + ",")
    serial.writeString("\"s\":" + radio.receivedPacket(RadioPacketProperty.SerialNumber) + ",")
    serial.writeString("\"sonda\":\"" + sonda + "\"" + ",")
    serial.writeString("\"n\":\"" + name + "\"" + ",")
    serial.writeString("\"v\":\"" + value + "\"")
    serial.writeLine("}")
    if (name.compare("h2o") == 0) {
        datalogger.log(
        datalogger.createCV("sonda", sonda),
        datalogger.createCV("h2o", value)
        )
    }
})
let sonda = ""
let id = 0
radio.setTransmitPower(7)
radio.setGroup(97)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Hours)
datalogger.setColumnTitles(
"sonda",
"h2o"
)
