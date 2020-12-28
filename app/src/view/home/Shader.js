/**
 *
 * @param gl
 * @param type
 * @param source
 * @returns {WebGLShader|null}//返回生成器
 */
function loadShader(gl,type,source){
    const shader=gl.createShader(type)
    gl.shaderSource(shader,source)
    gl.compileShader(shader)
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
        return null;
    return shader
}

/**
 *
 * @param gl
 * @param vsSource
 * @param fsSource
 * @returns {null|WebGLProgram}
 */

const initShader=function (gl,vsSource,fsSource) {
    const vertexShader=loadShader(gl,gl.VERTEX_SHADER,vsSource)
    const fragmentShader=loadShader(gl,gl.FRAGMENT_SHADER,fsSource)
    const shaderProgrem=gl.createProgram();
    gl.attachShader(shaderProgrem,vertexShader)
    gl.attachShader(shaderProgrem,fragmentShader)
    if(!gl.getShaderParameter(shaderProgrem,gl.LINK_STATUS))
        return null;
    return shaderProgrem

}

export default  initShader
