const inputJson = `{
  "version": 1,
  "author": "Majd",
  "editor": "wokwi",
  "parts": [
    { "type": "wokwi-pi-pico", "id": "pico", "top": -12.75, "left": -54, "attrs": {} },
    {
      "type": "wokwi-ntc-temperature-sensor",
      "id": "ntc1",
      "top": -93.4,
      "left": 37.8,
      "attrs": {}
    },
    {
      "type": "wokwi-rgb-led",
      "id": "rgb1",
      "top": -63.2,
      "left": -142.9,
      "attrs": { "common": "cathode" }
    },
    { "type": "wokwi-ky-040", "id": "encoder1", "top": 107.3, "left": 76, "attrs": {} }
  ],
  "connections": [
    [ "pico:GP0", "$serialMonitor:RX", "", [] ],
    [ "pico:GP1", "$serialMonitor:TX", "", [] ],
    [ "pico:GP1", "rgb1:B", "blue", [ "h0" ] ],
    [ "pico:GND.1", "rgb1:COM", "black", [ "h0" ] ],
    [ "rgb1:G", "pico:GP2", "limegreen", [ "v0" ] ],
    [ "rgb1:R", "pico:GP3", "red", [ "v0" ] ],
    [ "ntc1:GND", "pico:GND.8", "black", [ "h28.8", "v86.4" ] ],
    [ "ntc1:VCC", "pico:3V3", "red", [ "h38.4", "v86.4" ] ],
    [ "ntc1:OUT", "pico:GP28", "green", [ "h28.8", "v105.5" ] ],
    [ "encoder1:VCC", "pico:3V3", "red", [ "h19.2", "v-105.2" ] ],
    [ "encoder1:GND", "pico:GND.7", "black", [ "h9.6", "v-85.6" ] ],
    [ "encoder1:CLK", "pico:GP27", "green", [ "h0", "v-38.4" ] ],
    [ "encoder1:DT", "pico:GP26", "green", [ "h0", "v-38.3" ] ]
  ],
  "dependencies": {}
}`

const obj = JSON.parse(inputJson);

console.log(obj.author);
// Expected output: 42

console.log(obj.parts.{1}.id);
// Expected output: true
