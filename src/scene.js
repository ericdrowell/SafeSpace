function scene_init() {
  sceneCanvas = document.getElementById('sceneCanvas');
  sceneContext = sceneCanvas.getContext('webgl');
  
  webgl_setSize(sceneCanvas);

  shaderProgram = sceneContext.createProgram();
  webgl_setShaderProgram(shaderProgram, sceneContext, fragmentShader, vertexShader);
  
  scene_initUniforms();

  const blendingColor = [0.0, 1.0, 0.0];
  const blendingAlpha = 0.5;

  //Enables depth testing
  sceneContext.enable(sceneContext.DEPTH_TEST);
  sceneContext.depthFunc(sceneContext.LESS);

  //Enables blending
  sceneContext.enable(sceneContext.BLEND);

  //Blending function for transparencies
  sceneContext.blendFunc(sceneContext.SRC_ALPHA, sceneContext.ONE_MINUS_SRC_ALPHA);   
  sceneContext.blendColor(blendingColor[0], blendingColor[1], blendingColor[2], blendingAlpha);    
  //Enable culling
  sceneContext.enable(sceneContext.CULL_FACE);

  sceneContext.pixelStorei(sceneContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  sceneContext.pixelStorei(sceneContext.UNPACK_FLIP_Y_WEBGL, 1);
  
};

function scene_initUniforms() {
  webgl_setAttribLocation(shaderProgram, sceneContext, 've'); // vertex vector
  webgl_setAttribLocation(shaderProgram, sceneContext, 'tc'); // texture vector

  webgl_setUniformLocation(shaderProgram, sceneContext, 'mv'); // move matrix
  webgl_setUniformLocation(shaderProgram, sceneContext, 'pm'); // perspective matrix
};

function scene_setUniforms() {
  sceneContext.uniform1i(shaderProgram.sa, 0);
  sceneContext.uniformMatrix4fv(shaderProgram.pm, false, pMatrix);
  sceneContext.uniformMatrix4fv(shaderProgram.mv, false, mvMatrix);
  
  // let normalMatrix = mat3.create();
  // mat4.toInverseMat3(mvMatrix, normalMatrix);
  // mat3.transpose(normalMatrix);
  // sceneContext.uniformMatrix3fv(shaderProgram.nm, false, normalMatrix);
  // sceneContext.uniform1i(shaderProgram.fl, flashTimeRemaining > 0);
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
  //sceneContext.bindBuffer(sceneContext.ARRAY_BUFFER, buffers.normal);
  //sceneContext.vertexAttribPointer(shaderProgram.no, 3, sceneContext.FLOAT, false, 0, 0);



  // set uniforms
  scene_setUniforms();

  // draw elements
  sceneContext.drawElements(sceneContext.TRIANGLES, buffers.index.numElements, sceneContext.UNSIGNED_SHORT, 0);
};


