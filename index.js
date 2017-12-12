const io = require("socket.io")()
const mdns = require("mdns")
const execa = require("execa")
const path = require("path")
const a = require("awaiting")

const internalIp = require("os").networkInterfaces().wlan0[0].address

console.log(internalIp)

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

async function moveRight() {
  await execa(moveHorizontal + " 60")
}

async function moveLeft() {
  await execa(moveHorizontal + " -60")
}

async function moveUp() {
  await execa(moveVertical + " 60")
}

async function moveDown() {
  await execa(moveVertical + " -60")
}

io.on("connection", socket => {
  socket.on("moveRight", () => moveRight())
  socket.on("moveLeft", () => moveLeft())
  socket.on("moveUp", () => moveUp())
  socket.on("moveDown", () => moveDown())
})

io.listen(port)
