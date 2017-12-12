const io = require("socket.io")()
const mdns = require("mdns")
const execa = require("execa")
const path = require("path")
const a = require("awaiting")

const internalIp = require("os").networkInterfaces().wlan0[0].address

const port = 8890
const ad = mdns.createAdvertisement(mdns.tcp("http"), port, {
  name: "DOMOPETS_LaserController",
  txtRecord: {
    url: `${internalIp}:${port}`,
  },
})

const laserServoPath = path.join(__dirname, "..", "laser-servo")
const moveHorizontal = path.join(laserServoPath, "move-horizontal")
const moveVertical = path.join(laserServoPath, "move-vertical")

async function moveRight(angle) {
    await execa(moveHorizontal, [angle.toString()])
}

async function moveLeft(angle) {
    await execa(moveHorizontal, [angle.toString()])
}

async function moveUp(angle) {
    await execa(moveVertical, [angle.toString()])
}

async function moveDown(angle) {
    await execa(moveVertical, [angle.toString()])
}

io.on("connection", socket => {
  socket.on("moveRight", (angle) => moveRight(angle))
  socket.on("moveLeft", (angle) => moveLeft(angle))
  socket.on("moveUp", (angle) => moveUp(angle))
  socket.on("moveDown", (angle) => moveDown(angle))
})

io.listen(port)
