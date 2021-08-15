precision highp float;

varying vec2 vTextureCoord;
varying vec3 vLightWeighting;
uniform sampler2D sa; // uSampler

void main(void) {
  vec4 textureColor = texture2D(sa, vTextureCoord);
  gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
}