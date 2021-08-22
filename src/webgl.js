
function webgl_init() {
  mvMatrix = mat4.create(); 
  pMatrix = mat4.create();

  sceneCanvas = document.getElementById('sceneCanvas');
  sceneContext = sceneCanvas.getContext('webgl');

  shaderProgram = sceneContext.createProgram();
  webgl_linkProgram(shaderProgram, sceneContext, fragmentShader, vertexShader);

  perlinShaderProgram = sceneContext.createProgram();
  webgl_linkProgram(perlinShaderProgram, sceneContext, perlinFragmentShader, perlinVertexShader);

  webgl_setSize(sceneCanvas);  
}

function webgl_renderBlockElements(buffers, texture) {
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
  //sceneContext.cullFace(sceneContext.FRONT);

  //sceneContext.pixelStorei(sceneContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  //sceneContext.pixelStorei(sceneContext.UNPACK_FLIP_Y_WEBGL, 1);

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
  sceneContext.uniformMatrix4fv(shaderProgram.pm, false, pMatrix);
  sceneContext.uniformMatrix4fv(shaderProgram.mv, false, mvMatrix);

  // draw elements
  sceneContext.drawElements(sceneContext.TRIANGLES, buffers.index.numElements, sceneContext.UNSIGNED_SHORT, 0);
};

function webgl_renderPerlinElements(buffers, color, perlinSize) {
  sceneContext.useProgram(perlinShaderProgram);

  webgl_setAttribLocation(perlinShaderProgram, sceneContext, 've'); // vertex vector
  webgl_setAttribLocation(perlinShaderProgram, sceneContext, 'tc'); // texture vector
  
  webgl_setUniformLocation(perlinShaderProgram, sceneContext, 'mv'); // move matrix
  webgl_setUniformLocation(perlinShaderProgram, sceneContext, 'pm'); // perspective matrix
  webgl_setUniformLocation(perlinShaderProgram, sceneContext, 't'); 
  webgl_setUniformLocation(perlinShaderProgram, sceneContext, 'color'); // perspective matrix
  webgl_setUniformLocation(perlinShaderProgram, sceneContext, 'perlinSize'); // perspective matrix

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
  //sceneContext.disable(sceneContext.CULL_FACE);
  //sceneContext.cullFace(sceneContext.FRONT_AND_BACK);

  // position buffers
  sceneContext.bindBuffer(sceneContext.ARRAY_BUFFER, buffers.position);
  sceneContext.vertexAttribPointer(perlinShaderProgram.ve, 3, sceneContext.FLOAT, false, 0, 0);


  // texture buffers
  sceneContext.bindBuffer(sceneContext.ARRAY_BUFFER, buffers.texture);
  sceneContext.vertexAttribPointer(perlinShaderProgram.tc, 2, sceneContext.FLOAT, false, 0, 0);

  // index buffers
  sceneContext.bindBuffer(sceneContext.ELEMENT_ARRAY_BUFFER, buffers.index);

  // set uniforms
  sceneContext.uniformMatrix4fv(perlinShaderProgram.pm, false, pMatrix);
  sceneContext.uniformMatrix4fv(perlinShaderProgram.mv, false, mvMatrix);
  sceneContext.uniform1f(perlinShaderProgram.t, totalElapsedTime * 0.0001);
  sceneContext.uniform3fv(perlinShaderProgram.color, color);
  sceneContext.uniform1f(perlinShaderProgram.perlinSize, perlinSize);

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

function world_buildBlockBuffers() {
  let rawBuffers = {};
  for (let x in world) {
    for (let y in world[x]) {
      for (let z in world[x][y]) {
        let block = world[x][y][z];
        let texture = block.texture;

        if (texture === TEXTURES_INVISIBLE) {
          continue;
        }

        if (rawBuffers[texture] === undefined) {
          rawBuffers[texture] = [
            {
              position: [],
              texture: [],
              index: [],
              numBlocks: 0
            }
          ];
        }

        let lastBuffer = rawBuffers[texture][rawBuffers[texture].length-1];

        // used to slightly offset all blocks so they don't fit perfectly, and create a more organic fitting
        let randomOffset = texture === TEXTURES_DIRT ? 0 : (Math.random() - 0.5) * 0.1;

        // position buffer
        for (let n = 0; n < CUBE_BUFFERS.position.length; n+=3) {
          lastBuffer.position.push(CUBE_BUFFERS.position[n] + parseInt(x)*2 + randomOffset);
          lastBuffer.position.push(CUBE_BUFFERS.position[n+1] + parseInt(y)*2 + randomOffset);
          lastBuffer.position.push(CUBE_BUFFERS.position[n+2] + parseInt(z)*2 + randomOffset);
        }

        // texture buffer
        utils_concat(lastBuffer.texture, CUBE_BUFFERS.texture);

        // index buffer
        for (let n = 0; n < CUBE_BUFFERS.index.length; n++) {
          lastBuffer.index.push(CUBE_BUFFERS.index[n] + (24 * lastBuffer.numBlocks));
        }

        if (lastBuffer.numBlocks >= BLOCKS_PER_BUFFER) {
          rawBuffers[texture].push({
            position: [],
            texture: [],
            index: [],
            numBlocks: 0
          });
        }
        else {
          lastBuffer.numBlocks++;
        }
      }
    }
  }

  // convert regular arrays to webgl buffers
  for (let texture in rawBuffers) {
    worldBuffers[texture] = [];

    rawBuffers[texture].forEach(function(buffer) {
      worldBuffers[texture].push({
        position: webgl_createArrayBuffer(sceneContext, buffer.position),
        texture: webgl_createArrayBuffer(sceneContext, buffer.texture),
        index: webgl_createElementArrayBuffer(sceneContext, buffer.index)
      });
    });
  }
}

function world_buildFieldBuffers() {
  let rawBuffers = {
    position: [],
    texture: [],
    index: []
  };

  for (let p=0; p<worldFields.length; p++) {
    let field = worldFields[p];

    // position buffer
    for (let n = 0; n < CUBE_BUFFERS.position.length; n+=3) {
      rawBuffers.position.push(CUBE_BUFFERS.position[n]*SAFE_SPACE_SIZE*2 + parseInt(field.x)*2);
      rawBuffers.position.push(CUBE_BUFFERS.position[n+1]*SAFE_SPACE_SIZE*2 + parseInt(field.y)*2);
      rawBuffers.position.push(CUBE_BUFFERS.position[n+2]*SAFE_SPACE_SIZE*2 + parseInt(field.z)*2);
    }

    // texture buffer
    utils_concat(rawBuffers.texture, CUBE_BUFFERS.texture);

    // index buffer
    for (let n = 0; n < CUBE_BUFFERS.index.length; n++) {
      rawBuffers.index.push(CUBE_BUFFERS.index[n] + p);
    }
  }

  // convert regular arrays to webgl buffers
  fieldBuffers = {
    position: webgl_createArrayBuffer(sceneContext, rawBuffers.position),
    texture: webgl_createArrayBuffer(sceneContext, rawBuffers.texture),
    index: webgl_createElementArrayBuffer(sceneContext, rawBuffers.index)
  };
}

function world_buildSphereBuffers() {
  let rawBuffers = {
    position: [],
    texture: [],
    index: []
  };

  for (let p=0; p<worldSpheres.length; p++) {
    let sphere = worldSpheres[p];

    // position buffer
    for (let n = 0; n < SPHERE_BUFFERS.position.length; n+=3) {
      rawBuffers.position.push(SPHERE_BUFFERS.position[n]*SPHERE_SIZE*2 + parseInt(sphere.x)*2);
      rawBuffers.position.push(SPHERE_BUFFERS.position[n+1]*SPHERE_SIZE*2 + parseInt(sphere.y)*2);
      rawBuffers.position.push(SPHERE_BUFFERS.position[n+2]*SPHERE_SIZE*2 + parseInt(sphere.z)*2);
    }

    // texture buffer
    utils_concat(rawBuffers.texture, SPHERE_BUFFERS.texture);

    // index buffer
    for (let n = 0; n < SPHERE_BUFFERS.index.length; n++) {
      rawBuffers.index.push(SPHERE_BUFFERS.index[n] + p);
    }
  }

  // convert regular arrays to webgl buffers
  sphereBuffers = {
    position: webgl_createArrayBuffer(sceneContext, rawBuffers.position),
    texture: webgl_createArrayBuffer(sceneContext, rawBuffers.texture),
    index: webgl_createElementArrayBuffer(sceneContext, rawBuffers.index)
  };
}

function world_buildBuffers() {
  world_buildBlockBuffers();
  world_buildFieldBuffers();
  world_buildSphereBuffers();
}

function world_render() {
  for (let texture in worldBuffers) {
    worldBuffers[texture].forEach(function(buffer) {
      webgl_renderBlockElements(buffer, textures[texture].glTexture);
    });
  } 
  
  webgl_renderPerlinElements(sphereBuffers, [0.8, 0, 0], 80);
  webgl_renderPerlinElements(fieldBuffers, [0, 0.5, 0.8], 10);
  
}