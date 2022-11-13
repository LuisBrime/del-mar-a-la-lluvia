// https://github.com/mattdesl/canvas-sketch

// para guardar una imagen del sketch: CMD + S
// para guardar una sequencia de imagnes de la duración del sketch: CMD + SHIFT + S
// yo uso ffmpeg para convertir una sequencia de imagenes en video con el siguiente comando:
// ffmpeg -r 60 -f image2 -s 1920x1080 -i tmp/%03d.png -vcodec libx264 -crf 25  -pix_fmt yuv420p video.mp4

// canvas-sketch de Matt te ayuda a exportar sketches de forma rapida y experimentar con creative coding, checalo aquí: https://github.com/mattdesl/canvas-sketch

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
  duration: 45, // duration of the sketch,
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
