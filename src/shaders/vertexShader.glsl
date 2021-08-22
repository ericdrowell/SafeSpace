attribute vec3 ve; // aVertexPosition
attribute vec2 tc; // aTextureCoord

uniform mat4 mv; // uMVMatrix
uniform mat4 pm; // uPMatrix
uniform float t;

varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

void main(void) {
  vec4 worldVertexPos = mv * vec4(ve, 1.0);
  gl_Position = pm * worldVertexPos;

  vTextureCoord = tc;
  
  vec3 pointLightPos = vec3(0, 0, 0);
  vec3 pointLightColor = vec3(1, 1, 1);
  float pointLightDist = length(pointLightPos - worldVertexPos.xyz);
  float pointLightWeight = 3.0 * pow(0.97, pointLightDist);
  vec3 pointLight = pointLightColor * pointLightWeight; 
  vLightWeighting = pointLight;
}