/**
 *
 * @param gl
 * @param type
 * @param source
 * @returns {WebGLShader|null}//返回生成器
 */
function loadShader(gl,type,source){
    const shader=gl.createShader(type)//生成着色器
    gl.shaderSource(shader,source)//指定来源
    gl.compileShader(shader)//编译
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
    const shaderProgram=gl.createProgram();
    gl.attachShader(shaderProgram,vertexShader)
    gl.attachShader(shaderProgram,fragmentShader)
    gl.linkProgram(shaderProgram)
    if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS))
        return null;
    return shaderProgram

}

export default  initShader
