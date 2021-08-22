attribute vec3 ve; // aVertexPosition
attribute vec2 tc; // aTextureCoord

uniform mat4 mv; // uMVMatrix
uniform mat4 pm; // uPMatrix
uniform float t;
uniform vec3 color;
uniform float perlinSize;

varying vec2 vTextureCoord;
varying float vTime;
varying vec3 vColor;
varying float vPerlinSize;

void main(void) {
  vec4 worldVertexPos = mv * vec4(ve, 1.0);
  gl_Position = pm * worldVertexPos;

  vTextureCoord = tc;
  vTime = t;
  vColor = color;
  vPerlinSize = perlinSize;
}