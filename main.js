/**
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById('canvas')
console.log(canvas)

let gl = canvas.getContext('webgl')

if (gl === null) {
    console.error('Unable to initialize WebGL. Your browser or machine may not support it.')
} else {
    // set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    // clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT)
}
