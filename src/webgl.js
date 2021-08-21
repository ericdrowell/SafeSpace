
function webgl_init() {
  mvMatrix = mat4.create(); 
  pMatrix = mat4.create();

  sceneCanvas = document.getElementById('sceneCanvas');
  sceneContext = sceneCanvas.getContext('webgl');

  shaderProgram = sceneContext.createProgram();
  webgl_linkProgram(shaderProgram, sceneContext, fragmentShader, vertexShader);

  planeShaderProgram = sceneContext.createProgram();
  webgl_linkProgram(planeShaderProgram, sceneContext, planeFragmentShader, vertexShader);

  webgl_setSize(sceneCanvas);  
}

function webgl_useTextureProgram() {
  sceneContext.useProgram(shaderProgram);

  webgl_setAttribLocation(shaderProgram, sceneContext, 've'); // vertex vector
  webgl_setAttribLocation(shaderProgram, sceneContext, 'tc'); // texture vector
  webgl_setUniformLocation(shaderProgram, sceneContext, 'mv'); // move matrix
  webgl_setUniformLocation(shaderProgram, sceneContext, 'pm'); // perspective matrix

  // const blendingColor = [0.0, 1.0, 0.0];
  // const blendingAlpha = 0.5;

  //Enables depth testing
  sceneContext.depthMask(true);
  sceneContext.enable(sceneContext.DEPTH_TEST);
  sceneContext.depthFunc(sceneContext.LESS);

  sceneContext.disable(sceneContext.BLEND);

  //Enables blending
  //sceneContext.enable(sceneContext.BLEND);

  //Blending function for transparencies
  //sceneContext.blendFunc(sceneContext.SRC_ALPHA, sceneContext.ONE_MINUS_SRC_ALPHA);   
  //sceneContext.blendColor(blendingColor[0], blendingColor[1], blendingColor[2], blendingAlpha);    
  //Enable culling
  //sceneContext.enable(sceneContext.CULL_FACE);

  //sceneContext.pixelStorei(sceneContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  //sceneContext.pixelStorei(sceneContext.UNPACK_FLIP_Y_WEBGL, 1);
}

function webgl_usePerlinProgram() {
  sceneContext.useProgram(planeShaderProgram);

  webgl_setAttribLocation(planeShaderProgram, sceneContext, 've'); // vertex vector
  webgl_setAttribLocation(planeShaderProgram, sceneContext, 'tc'); // texture vector
  webgl_setUniformLocation(planeShaderProgram, sceneContext, 'mv'); // move matrix
  webgl_setUniformLocation(planeShaderProgram, sceneContext, 'pm'); // perspective matrix

  

  //Enables depth testing
  sceneContext.depthMask(false);
  sceneContext.enable(sceneContext.DEPTH_TEST);
  sceneContext.depthFunc(sceneContext.LESS);

  //Enables blending
  

  //Blending function for transparencies
  sceneContext.enable(sceneContext.BLEND);
  sceneContext.blendFunc(sceneContext.SRC_ALPHA, sceneContext.ONE_MINUS_SRC_ALPHA);   
  sceneContext.blendColor(1, 1, 1, 0.5);   

  //Enable culling
  //sceneContext.enable(sceneContext.CULL_FACE);
  //sceneContext.cullFace(sceneContext.FRONT_AND_BACK);
  

}

function webgl_renderTexturedElement(buffers, texture) {
  webgl_useTextureProgram();

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

  // set uniforms
  sceneContext.uniform1i(shaderProgram.sa, 0);
  sceneContext.uniformMatrix4fv(shaderProgram.pm, false, pMatrix);
  sceneContext.uniformMatrix4fv(shaderProgram.mv, false, mvMatrix);

  // draw elements
  sceneContext.drawElements(sceneContext.TRIANGLES, buffers.index.numElements, sceneContext.UNSIGNED_SHORT, 0);
};

function webgl_renderPerlinElement(buffers, texture) {
  webgl_usePerlinProgram();

  // position buffers
  sceneContext.bindBuffer(sceneContext.ARRAY_BUFFER, buffers.position);
  sceneContext.vertexAttribPointer(planeShaderProgram.ve, 3, sceneContext.FLOAT, false, 0, 0);

  // texture buffers
  sceneContext.bindBuffer(sceneContext.ARRAY_BUFFER, buffers.texture);
  sceneContext.vertexAttribPointer(planeShaderProgram.tc, 2, sceneContext.FLOAT, false, 0, 0);

  // index buffers
  sceneContext.bindBuffer(sceneContext.ELEMENT_ARRAY_BUFFER, buffers.index);

  // set uniforms
  sceneContext.uniform1i(planeShaderProgram.sa, 0);
  sceneContext.uniformMatrix4fv(planeShaderProgram.pm, false, pMatrix);
  sceneContext.uniformMatrix4fv(planeShaderProgram.mv, false, mvMatrix);

  // draw elements
  sceneContext.drawElements(sceneContext.TRIANGLES, buffers.index.numElements, sceneContext.UNSIGNED_SHORT, 0);
};


function webgl_setSize(canvas) {
  canvas.width = viewportWidth;
  canvas.height = viewportHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;

  // very wide screen
  if (windowRatio > GAME_ASPECT_RATIO) {
    canvas.style.left = '50%';
    canvas.style.marginLeft = '-' + (viewportWidth/2) + 'px'
  }
  // very tall screen
  else {
    canvas.style.top = '50%';
    canvas.style.marginTop = '-' + (viewportHeight/2) + 'px'
  }
}

function webgl_linkProgram(program, context, fragShader, vertShader) {
  let shader;

  shader = context.createShader(context.FRAGMENT_SHADER);
  context.shaderSource(shader, fragShader);
  context.compileShader(shader);
  context.attachShader(program, shader);
  
  shader = context.createShader(context.VERTEX_SHADER);
  context.shaderSource(shader, vertShader);
  context.compileShader(shader);
  context.attachShader(program, shader);

  context.linkProgram(program);
  // if (!context.getProgramParameter(program, context.LINK_STATUS)) {
  //   alert('Could not initialize shaders');
  // }
};

function webgl_createArrayBuffer(context, vertices) {
  let buffer = context.createBuffer();
  buffer.numElements = vertices.length;
  context.bindBuffer(context.ARRAY_BUFFER, buffer);
  context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);
  return buffer;
};

function webgl_createElementArrayBuffer(context, vertices) {
  let buffer = context.createBuffer();
  buffer.numElements = vertices.length;
  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, buffer);
  context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertices), context.STATIC_DRAW);
  return buffer;
};

function webgl_clear(canvas, context) {
  context.viewport(0, 0, canvas.width, canvas.height);
  context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
}

function webgl_setUniformLocation(program, context, key) {
  program[key] = context.getUniformLocation(program, key);
}

function webgl_setAttribLocation(program, context, key) {
  program[key] = context.getAttribLocation(program, key);
  context.enableVertexAttribArray(program[key]);
}

function modelView_save() {
  var copy = mat4.create();
  mat4.set(mvMatrix, copy);
  mvMatrixStack.push(copy);
};

function modelView_restore() {
  mvMatrix = mvMatrixStack.pop();
};