import * as glMatrix from './jslibs/gl-matrix/src/index.js'

console.log(glMatrix)

/**
 * create a shader of the given type, uploads the source and compiles it
 * @param {WebGLRenderingContext} gl 
 * @param {number} type 
 * @param {string} source 
 */
function loadShader(gl, type, source) {
    let shader = gl.createShader(type)

    // send the source to the shader object
    gl.shaderSource(shader, source)

    // compile the shader program
    gl.compileShader(shader)

    // see if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
    }

    return shader
}

/**
 * initialize a shader program, so WebGL knows how to draw our data
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {string} vsSource 
 * @param {string} fsSource 
 */
function initShaderProgram(gl, vsSource, fsSource) {
    let vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
    let fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

    // create the shader program
    let shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    // check if creating the shader program failed
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram))
        return null
    }

    return shaderProgram
}

/**
 * @param {WebGLRenderingContext} gl 
 */
function initBuffers(gl) {
    // create a buffer for the square's positions
    let positionBuffer = gl.createBuffer()

    // select the positionBuffer as the one to apply buffer operations to from here out
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // now create an array of positions for the square
    let positions = [
        -1.0, 1.0,
        1.0, 1.0,
        -1.0, -1.0,
        1.0, -1.0,
    ]

    // now pass the list of positions into WebGL to build the shape
    // we do this by creating a Float32Array from the JavaScript array,
    // then use it to fill the current buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    return {
        position: positionBuffer,
    }
}

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

    let aVertexPositionName = 'aVertexPosition'
    let uProjectionMatrixName = 'uProjectionMatrix'
    let uModelViewMatrixName = 'uModelViewMatrix'

    let vsSource = `
        attribute vec4 ${aVertexPositionName};

        uniform mat4 ${uProjectionMatrixName};
        uniform mat4 ${uModelViewMatrixName};

        void main() {
            gl_Position = ${uProjectionMatrixName} * ${uModelViewMatrixName} * ${aVertexPositionName};
        }
    `

    let fsSource = `
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `

    let shaderProgram = initShaderProgram(gl, vsSource, fsSource)
    console.log(shaderProgram)

    let programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, aVertexPositionName),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, uProjectionMatrixName),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, uModelViewMatrixName),
        },
    }

    let buffers = initBuffers(gl)

    // clear to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    // clear everything
    gl.clearDepth(1.0)
    // enable depth testing
    gl.enable(gl.DEPTH_TEST)
    // near things obscure far things
    gl.depthFunc(gl.LEQUAL)

    // clear the canvas before we start drawing on it.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // create a perspective matrix, a special matrrix that is used to
    // simulate the distortion of perspective in a camera
    // our field of view is 45 degrees, with a width/height ratio that
    // matches the display size of the canvas and we only want to see
    // objects between 0.1 units and 100 units away from the camera

    let fieldOfView = 45 * Math.PI / 180 // in radians
    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    let zNear = 0.1
    let zFar = 100.0
    let projectionMatrix = glMatrix.mat4.create()

    // note: glMatrix always has the first argument as the destination
    // to receive the result
    glMatrix.mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar)

    // set the drawing position to the 'identity' point, which is the
    // center of the scene
    let modelViewMatrix = glMatrix.mat4.create()

    // now move the drawing position a bit to where we want to start
    // drawing the square
    glMatrix.mat4.translate(
        modelViewMatrix, // destination matrix
        modelViewMatrix, // matrix to translate
        [-0.0, 0.0, -6.0], // amount to translate
    )

    // tell WebGL how to pull out the positions from the position buffer
    // into the vertexPosition attribute
    {
        // pull out 2 values per iteration
        let numComponents = 2
        // the data in the buffer is 32bit floats
        let type = gl.FLOAT
        // don't normalize
        let normalize = false
        // how many bytes to get from one set of values to the next
        // 0 = use type  and numComponents above? (I'm kind of understand 'stride' but I didn't get that explanation.)
        let stride = 0
        // how many bytes inside the buffer to start from
        let offset = 0

        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset,
        )

        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
    }

    // tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program)

    // set the shader uniforms
    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix)
    gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix)

    {
        let offset = 0
        let vertexCount = 4
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
    }
}
