function scene_init() {
  sceneCanvas = document.getElementById('sceneCanvas');
  sceneContext = sceneCanvas.getContext('webgl');
  
  webgl_setSize(sceneCanvas);

  shaderProgram = sceneContext.createProgram();
  webgl_setShaderProgram(shaderProgram, sceneContext, fragmentShader, vertexShader);
  
  scene_initUniforms();

  // init depth test
  sceneContext.enable(sceneContext.DEPTH_TEST);
};

function scene_initUniforms() {
  webgl_setAttribLocation(shaderProgram, sceneContext, 've');
  webgl_setAttribLocation(shaderProgram, sceneContext, 'no');
  webgl_setAttribLocation(shaderProgram, sceneContext, 'tc');

  webgl_setUniformLocation(shaderProgram, sceneContext, 'pm');
  webgl_setUniformLocation(shaderProgram, sceneContext, 'mv');
  webgl_setUniformLocation(shaderProgram, sceneContext, 'sa');
  webgl_setUniformLocation(shaderProgram, sceneContext, 'nm');
  webgl_setUniformLocation(shaderProgram, sceneContext, 'fl');
};

function scene_setUniforms() {
  sceneContext.uniform1i(shaderProgram.sa, 0);
  sceneContext.uniformMatrix4fv(shaderProgram.pm, false, pMatrix);
  sceneContext.uniformMatrix4fv(shaderProgram.mv, false, mvMatrix);
  
  let normalMatrix = mat3.create();
  mat4.toInverseMat3(mvMatrix, normalMatrix);
  mat3.transpose(normalMatrix);
  sceneContext.uniformMatrix3fv(shaderProgram.nm, false, normalMatrix);

  sceneContext.uniform1i(shaderProgram.fl, flashTimeRemaining > 0);
};

function scene_render(buffers, texture) {
  // position buffers
  sceneContext.bindBuffer(sceneContext.ARRAY_BUFFER, buffers.position);
  sceneContext.vertexAttribPointer(shaderProgram.ve, 3, sceneContext.FLOAT, false, 0, 0);

  // texture buffers
  sceneContext.bindBuffer(sceneContext.ARRAY_BUFFER, buffers.texture);
  sceneContext.vertexAttribPointer(shaderProgram.tc, 2, sceneContext.FLOAT, false, 0, 0);
  sceneContext.activeTexture(sceneContext.TEXTURE0);
  sceneContext.bindTexture(sceneContext.TEXTURE_2D, texture);
  // index buffers
  sceneContext.bindBuffer(sceneContext.ELEMENT_ARRAY_BUFFER, buffers.index);

  // normal buffers
  sceneContext.bindBuffer(sceneContext.ARRAY_BUFFER, buffers.normal);
  sceneContext.vertexAttribPointer(shaderProgram.no, 3, sceneContext.FLOAT, false, 0, 0);

  // set uniforms
  scene_setUniforms();

  // draw elements
  sceneContext.drawElements(sceneContext.TRIANGLES, buffers.index.numElements, sceneContext.UNSIGNED_SHORT, 0);
};

function scene_initTexture(glTexture, image) {
  sceneContext.pixelStorei(sceneContext.UNPACK_FLIP_Y_WEBGL, true);
  sceneContext.bindTexture(sceneContext.TEXTURE_2D, glTexture);
  sceneContext.texImage2D(sceneContext.TEXTURE_2D, 0, sceneContext.RGBA, sceneContext.RGBA, sceneContext.UNSIGNED_BYTE, image);
  sceneContext.texParameteri(sceneContext.TEXTURE_2D, sceneContext.TEXTURE_MAG_FILTER, sceneContext.NEAREST);
  
  // WebGL1 has different requirements for power of 2 images
  sceneContext.generateMipmap(sceneContext.TEXTURE_2D);

  // sceneContext.texParameteri(sceneContext.TEXTURE_2D, sceneContext.TEXTURE_WRAP_S, sceneContext.CLAMP_TO_EDGE);
  // sceneContext.texParameteri(sceneContext.TEXTURE_2D, sceneContext.TEXTURE_WRAP_T, sceneContext.CLAMP_TO_EDGE);
  // sceneContext.texParameteri(sceneContext.TEXTURE_2D, sceneContext.TEXTURE_MIN_FILTER, sceneContext.LINEAR);

};


