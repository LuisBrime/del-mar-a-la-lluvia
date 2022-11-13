const canvasSketch = require('canvas-sketch')
const p5 = require('p5')

let shd
let W = 1920
let H = 1080

const preload = p5 => {
  shd = p5.loadShader('./shaders/vert.glsl', './shaders/frag.glsl')
}

const settings = {
  p5: { p5, preload }, // Pass the p5 instance, and preload function if necessary
  context: 'webgl', // WebGL context if p5 needs it
  animate: true, // Turn on a render loop
  dimensions: [W, H], // dimensions of the sketch
  duration: 10, // duration of the sketch,
  fps: 60,
}

canvasSketch(({ p5, width, height }) => {
  // Setup
  p5.noStroke()

  // Return a renderer, which is like p5.js 'draw' function
  return ({ time }) => {
    p5.shader(shd)

    shd.setUniform('uTime', time)
    shd.setUniform('uResolution', [W, H])

    // Crea una figura que usa el shader
    p5.rect(0, 0, W, H)
  }
}, settings)
