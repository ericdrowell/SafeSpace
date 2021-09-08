attribute vec3 ve; // aVertexPosition
attribute vec2 tc; // aTextureCoord

uniform mat4 mv; // uMVMatrix
uniform mat4 pm; // uPMatrix
uniform float t;

varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

void main(void) {
  vec4 worldVertexPos = mv * vec4(ve, 1.0);
  vec4 glPos = pm * worldVertexPos;
  gl_Position = glPos;

  vTextureCoord = tc;
  
  vec3 pointLightPos = vec3(0, 0, 0);
  vec3 pointLightColor = vec3(1, 1, 1);
  float pointLightDist = length(pointLightPos - worldVertexPos.xyz);
  float pointLightWeight = 1500.0 / (pointLightDist*pointLightDist);

  if (pointLightWeight > 4.0) {
    pointLightWeight = 4.0;
  }

  vec3 pointLight = pointLightColor * pointLightWeight; 

  // light effect from player pos
  //if (length(pointLightPos - worldVertexPos.xyz) > 50.0) {
  
  // flashlight
  glPos.y /= (16.0/9.0);
  if (length(pointLightPos.xy - glPos.xy) > 30.0) {
    pointLight *= 0.1;
  }
  vLightWeighting = pointLight;
}