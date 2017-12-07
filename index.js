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

io.listen(port)
