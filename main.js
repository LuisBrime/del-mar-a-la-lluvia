// @patriciogonzalezvivo
// @iamelizasj
// @melissazrttt
// @lejeunerenard
// @charstiles
// @praystation

let canvas, shd, time
let W = 1920
let H = 1080

function preload() {
    // Carga los archivos del shader
    shd = loadShader('./shaders/vert.glsl', './shaders/frag.glsl')
}

function setup() {
    // Evita que la densidad escale en pantallas tipo retina
    // que puede crear un escalado inconsistente entre monitores
    pixelDensity(2)
    canvas = createCanvas(W, H, WEBGL)
    noStroke()
}

function draw() {
    // Asigna el shader
    shader(shd)

    time = millis() / 1000

    // Actualiza las uniformes
    shd.setUniform('uTime', time)
    shd.setUniform('uResolution', [W, H])

    // Crea una figura que usa el shader
    rect(0, 0, W, H)
}

let recording
let recorder
function keyTyped() {
    if (key === 's') {
        console.log('Recording click.')
        if (recording) {
            recorder.stop()
        } else {
            const chunks = []
            const stream = document.querySelector('canvas').captureStream(60)
            recorder = new MediaRecorder(stream)

            recorder.ondataavailable = (e) => {
                if (e.data.size) chunks.push(e.data)
            }

            recorder.onstop = (e) => {
                console.log('Recording stopped.')
                console.log('Processing...')
                const blob = new Blob(chunks)
                const video = document.createElement('video')
                video.id = 'recorded'
                video.controls = true
                video.src = URL.createObjectURL(blob)
                console.log('Creating element...')
                document.body.appendChild(video)
                video.play()
                recording = false
            }

            console.log('Recording...')
            recorder.start()
            recording = true
        }
    }
}

function windowResized() {
    resizeCanvas(W, H)

    // Actualiza las uniformes
    shd.setUniform('uResolution', [W, H])
}