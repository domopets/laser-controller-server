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
const laserSoundPath = path.join(__dirname, "..", "laser-sound")

const on = path.join(laserServoPath, "on")
const off = path.join(laserServoPath, "off")

const soundOn = path.join(laserSoundPath, "sound-start")
const soundOff = path.join(laserSoundPath, "sound-end")

const moveHorizontal = path.join(laserServoPath, "move-horizontal")
const moveVertical = path.join(laserServoPath, "move-vertical")

async function moveRight() {
  await execa(moveHorizontal, 60)
}

async function moveLeft() {
  await execa(moveHorizontal, -60)
}

async function moveUp() {
  await execa(moveVertical, 60)
}

async function moveDown() {
  await execa(moveVertical, -60)
}

async function laserOn() {
  await execa(on)
}

async function laserOff() {
  await execa(off)
}

async function sound-start() {
  await execa(start)
}

async function sound-end() {
  await execa(end)
}

io.on("connection", socket => {
  socket.on("moveRight", () => moveRight())
  socket.on("moveLeft", () => moveLeft())
  socket.on("moveUp", () => moveUp())
  socket.on("moveDown", () => moveDown())
  socket.on("laserOn", () => laserOn())
  socket.on("laserOff", () => laserOff())
  socket.on("sound-start", () => sound-start())
  socket.on("sound-end", () => sound-end())
})

io.listen(port)
