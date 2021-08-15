function webgl_init() {
  mvMatrix = mat4.create(); 
  pMatrix = mat4.create();

  scene_init();
}

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

function webgl_setShaderProgram(program, context, fragShader, vertShader) {
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
  
  context.useProgram(program);
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