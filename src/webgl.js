

function webgl_init() {
  mvMatrix = mat4.create(); 
  pMatrix = mat4.create();

  //sceneCanvas = document.createElement('canvas');
  sceneCanvas = document.getElementById('sceneCanvas');

  sceneContext = sceneCanvas.getContext('webgl');

  shaderProgram = sceneContext.createProgram();
  webgl_linkProgram(shaderProgram, sceneContext, fragmentShader, vertexShader);

  perlinShaderProgram = sceneContext.createProgram();
  webgl_linkProgram(perlinShaderProgram, sceneContext, perlinFragmentShader, perlinVertexShader);

  webgl_setSize(sceneCanvas);  
}

// function webgl_show() {
//   sceneCanvas.style.display = 'block';
// }

// function webgl_hide() {
//   sceneCanvas.style.display = 'none';
// }

function webgl_renderBlockElements(buffers, texture) {
  sceneContext.useProgram(shaderProgram);

  webgl_setAttribLocation(shaderProgram, sceneContext, 've'); // vertex vector
  webgl_setAttribLocation(shaderProgram, sceneContext, 'tc'); // texture vector

  webgl_setUniformLocation(shaderProgram, sceneContext, 'mv'); // move matrix
  webgl_setUniformLocation(shaderProgram, sceneContext, 'pm'); // perspective matrix
  webgl_setUniformLocation(shaderProgram, sceneContext, 'lightPower');

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
  let lightPower = gameState === GAME_STATE_TITLE ? 4000 : 10000;
  sceneContext.uniform1f(shaderProgram.lightPower, lightPower);

  // draw elements
  sceneContext.drawElements(sceneContext.TRIANGLES, buffers.index.numElements, sceneContext.UNSIGNED_SHORT, 0);
};

function webgl_renderPerlinElements(buffers, color, perlinSize, hasDepthMask, speed) {
  sceneContext.useProgram(perlinShaderProgram);

  webgl_setAttribLocation(perlinShaderProgram, sceneContext, 've'); // vertex vector
  webgl_setAttribLocation(perlinShaderProgram, sceneContext, 'tc'); // texture vector
  
  webgl_setUniformLocation(perlinShaderProgram, sceneContext, 'mv'); // move matrix
  webgl_setUniformLocation(perlinShaderProgram, sceneContext, 'pm'); // perspective matrix
  webgl_setUniformLocation(perlinShaderProgram, sceneContext, 't'); 
  webgl_setUniformLocation(perlinShaderProgram, sceneContext, 'color'); // perspective matrix
  webgl_setUniformLocation(perlinShaderProgram, sceneContext, 'perlinSize'); // perspective matrix

  //Enables depth testing
  // TODO: when depth mask is false, it enables transparencies, but webgl context copy to 2d canvas gets messed up
  // I could create separate sets of buffers for each field plane, and reorder them before each render
  // oh, I could also draw small at first, and then scale it up, not sure this would work though
  //sceneContext.depthMask(hasDepthMask);
  sceneContext.depthMask(false);
  sceneContext.enable(sceneContext.DEPTH_TEST);
  sceneContext.depthFunc(sceneContext.LESS);

  //Enables blending
  

  //Blending function for transparencies
  sceneContext.enable(sceneContext.BLEND);
  sceneContext.blendFunc(sceneContext.SRC_ALPHA, sceneContext.ONE_MINUS_SRC_ALPHA);   
  sceneContext.blendColor(1, 1, 1, 1);   

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
  sceneContext.uniform1f(perlinShaderProgram.t, totalElapsedTime * speed);
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

function webgl_setUniformLocation(program, context, key) {
  program[key] = context.getUniformLocation(program, key);
}

function webgl_setAttribLocation(program, context, key) {
  program[key] = context.getAttribLocation(program, key);
  context.enableVertexAttribArray(program[key]);
}

function webgl_save() {
  var copy = mat4.create();
  mat4.set(mvMatrix, copy);
  mvMatrixStack.push(copy);
};

function webgl_restore() {
  mvMatrix = mvMatrixStack.pop();
};

function webgl_buildBlockBuffers() {
  worldBuffers = {};

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
        //let randomOffset = texture === TEXTURES_DIRT ? 0 : (Math.random() - 0.5) * 0.1;
        let randomOffset = 0;

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

function webgl_buildFieldBuffers() {
  let rawBuffers = {
    position: [],
    texture: [],
    index: []
  };

  //const zSize = gameState === GAME_STATE_TITLE ? 0 : SAFE_SPACE_SIZE;

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
      rawBuffers.index.push(CUBE_BUFFERS.index[n]);
    }
  }

  // convert regular arrays to webgl buffers
  fieldBuffers = {
    position: webgl_createArrayBuffer(sceneContext, rawBuffers.position),
    texture: webgl_createArrayBuffer(sceneContext, rawBuffers.texture),
    index: webgl_createElementArrayBuffer(sceneContext, rawBuffers.index)
  };
}

function webgl_buildGenericCubeBuffers() {
  let rawBuffers = {
    position: [],
    texture: [],
    index: []
  };


  // position buffer
  for (let n = 0; n < CUBE_BUFFERS.position.length; n+=3) {
    rawBuffers.position.push(CUBE_BUFFERS.position[n]);
    rawBuffers.position.push(CUBE_BUFFERS.position[n+1]);
    rawBuffers.position.push(CUBE_BUFFERS.position[n+2]);
  }

  // texture buffer
  utils_concat(rawBuffers.texture, CUBE_BUFFERS.texture);

  // index buffer
  for (let n = 0; n < CUBE_BUFFERS.index.length; n++) {
    rawBuffers.index.push(CUBE_BUFFERS.index[n]);
  }
  

  // convert regular arrays to webgl buffers
  genericCubeBuffer = {
    position: webgl_createArrayBuffer(sceneContext, rawBuffers.position),
    texture: webgl_createArrayBuffer(sceneContext, rawBuffers.texture),
    index: webgl_createElementArrayBuffer(sceneContext, rawBuffers.index)
  };
}

function webgl_buildSphereBuffers() {
  let rawBuffers = {
    position: [],
    texture: [],
    index: []
  };
  
  // position buffer
  for (let n = 0; n < SPHERE_BUFFERS.position.length; n+=3) {
    rawBuffers.position.push(SPHERE_BUFFERS.position[n]);
    rawBuffers.position.push(SPHERE_BUFFERS.position[n+1]);
    rawBuffers.position.push(SPHERE_BUFFERS.position[n+2]);
  }

  // texture buffer
  utils_concat(rawBuffers.texture, SPHERE_BUFFERS.texture);

  // index buffer
  for (let n = 0; n < SPHERE_BUFFERS.index.length; n++) {
    rawBuffers.index.push(SPHERE_BUFFERS.index[n]);
  }

  // convert regular arrays to webgl buffers
  sphereBuffers = {
    position: webgl_createArrayBuffer(sceneContext, rawBuffers.position),
    texture: webgl_createArrayBuffer(sceneContext, rawBuffers.texture),
    index: webgl_createElementArrayBuffer(sceneContext, rawBuffers.index)
  };
}

function webgl_buildDoorBuffers() {
  let rawBuffers = {
    position: [],
    texture: [],
    index: []
  };

  let blockIndex = 0;
  
  for (let x=0; x<7; x++) {
    for (let y=0; y<10; y++) {
      // carve out notch in door
      if (x === 0 && y > 3 || x === 1 && y > 4 || x === 2 && y > 5) {
        continue;
      }

      // position buffer
      for (let n = 0; n < CUBE_BUFFERS.position.length; n+=3) {
        rawBuffers.position.push(CUBE_BUFFERS.position[n]+x*2);
        rawBuffers.position.push(CUBE_BUFFERS.position[n+1]+y*2);
        rawBuffers.position.push(CUBE_BUFFERS.position[n+2]);
      }

      // texture buffer
      utils_concat(rawBuffers.texture, CUBE_BUFFERS.texture);

      // index buffer
      for (let n = 0; n < CUBE_BUFFERS.index.length; n++) {
        rawBuffers.index.push(CUBE_BUFFERS.index[n] + (24 * blockIndex));
      }

      blockIndex++;
    }
  }

  // convert regular arrays to webgl buffers
  doorBuffers = {
    position: webgl_createArrayBuffer(sceneContext, rawBuffers.position),
    texture: webgl_createArrayBuffer(sceneContext, rawBuffers.texture),
    index: webgl_createElementArrayBuffer(sceneContext, rawBuffers.index)
  };
}

function webgl_buildDoorEndBuffers() {
  let rawBuffers = {
    position: [],
    texture: [],
    index: []
  };

  let blockIndex = 0;

  let blockPositions = [
    0, -1,
    0, 0, 
    0, 1,
    0, 2,
    0, 3,
    1, 4,
    2, 5,
    3, 6,
    3, 7,
    3, 8,
    3, 9,
    3, 10
  ];
  
  for (let i=0; i<blockPositions.length; i+=2) {
    // position buffer
    for (let n = 0; n < CUBE_BUFFERS.position.length; n+=3) {
      rawBuffers.position.push(CUBE_BUFFERS.position[n]+blockPositions[i]*2);
      rawBuffers.position.push(CUBE_BUFFERS.position[n+1]+blockPositions[i+1]*2);
      rawBuffers.position.push(CUBE_BUFFERS.position[n+2]);
    }

    // texture buffer
    utils_concat(rawBuffers.texture, CUBE_BUFFERS.texture);

    // index buffer
    for (let n = 0; n < CUBE_BUFFERS.index.length; n++) {
      rawBuffers.index.push(CUBE_BUFFERS.index[n] + (24 * blockIndex));
    }

    blockIndex++;
    
  }

  // convert regular arrays to webgl buffers
  doorEndBuffers = {
    position: webgl_createArrayBuffer(sceneContext, rawBuffers.position),
    texture: webgl_createArrayBuffer(sceneContext, rawBuffers.texture),
    index: webgl_createElementArrayBuffer(sceneContext, rawBuffers.index)
  };
}

function webgl_buildBuffers() {
  webgl_buildBlockBuffers(); // static
  webgl_buildFieldBuffers(); // static

  webgl_buildSphereBuffers(); // dynamic
  webgl_buildDoorBuffers(); // dynamic
  webgl_buildDoorEndBuffers(); // dynamic
  webgl_buildGenericCubeBuffers(); // dynamic
}

function webgl_render() {
  let viewAngle = 45; // 45 -> 90
  let minDist = 0.1;
  //let maxDist = 150; 
  let maxDist = 300;
  mat4.perspective(viewAngle, sceneCanvas.width / sceneCanvas.height, minDist, maxDist, pMatrix);
  mat4.identity(mvMatrix);

  sceneContext.viewport(0, 0, sceneCanvas.width, sceneCanvas.height);
  sceneContext.clear(sceneContext.COLOR_BUFFER_BIT | sceneContext.DEPTH_BUFFER_BIT | sceneContext.STENCIL_BUFFER_BIT);



  mat4.rotate(mvMatrix, -player.pitch + pitchBobble, [1, 0, 0]);
  mat4.rotate(mvMatrix, -player.yaw, [0, 1, 0]);
  mat4.translate(mvMatrix, [-2 * player.x, -2 * (player.y + PLAYER_HEIGHT), -2 * player.z]);
  mat4.translate(mvMatrix, [0, bobble, 0]);

  // render world blocks
  for (let texture in worldBuffers) {
    worldBuffers[texture].forEach(function(buffer) {
      webgl_renderBlockElements(buffer, textures[texture].glTexture);
    });
  } 
  
  let spherePerlinSize = 100;
  let fieldPerlinSize = 10;

  if (gameState === GAME_STATE_TITLE) {
    spherePerlinSize = 150;
    fieldPerlinSize = 10;
  }

  // render doors
  for (let d=0; d<doors.length; d++) {
    let door = doors[d];

    webgl_save();

    mat4.translate(mvMatrix, [(door.x + door.offset)*2, door.y*2, door.z*2]);
    webgl_renderBlockElements(doorBuffers, textures[TEXTURES_FIB_METAL].glTexture);

    mat4.scale(mvMatrix, [-1, -1, 1]);
    mat4.translate(mvMatrix, [door.offset*4, -9*2, 0]);
    webgl_renderBlockElements(doorBuffers, textures[TEXTURES_FIB_METAL].glTexture);

    webgl_restore();
  }
  for (let d=0; d<doors.length; d++) {
    let door = doors[d];

    webgl_save();
    mat4.translate(mvMatrix, [(door.x -1 + door.offset)*2, door.y*2, door.z*2]);
    webgl_renderBlockElements(doorEndBuffers, textures[TEXTURES_CAUTION_STRIPES].glTexture);

    mat4.scale(mvMatrix, [-1, -1, 1]);
    mat4.translate(mvMatrix, [(door.offset-1)*4, -9*2, 0]);
    webgl_renderBlockElements(doorEndBuffers, textures[TEXTURES_CAUTION_STRIPES_ALT].glTexture);

    webgl_restore();
  }
  
  // render nova bursts
  for (let p=0; p<novas.length; p++) {
    let novaBurst = novas[p];

    let hasDepthMask = true;
    let speed = 0.0001;
    let scale = novaBurst.radius*2;

    if (gameState === GAME_STATE_TITLE) {
      hasDepthMask = false;
      speed = 0.00002;
      scale = 2;
    }

    webgl_save();
    mat4.translate(mvMatrix, [novaBurst.x*2, novaBurst.y*2, novaBurst.z*2]);
    mat4.scale(mvMatrix, [scale,scale,scale]);

    webgl_renderPerlinElements(sphereBuffers, [0.8, 0, 0], spherePerlinSize, hasDepthMask, speed);
    webgl_restore();
  }

  // render fields
  webgl_renderPerlinElements(fieldBuffers, [0, 0.5, 0.8], fieldPerlinSize, false, 0.0001);

  
  // render poison
  poisonPlanes.forEach(function(plane) {
    webgl_save();
    
    mat4.translate(mvMatrix, [plane.x*2, plane.y*2, plane.z*2]);
    // 4.9 so bottom poison layer doesn't flicker with floor layer
    mat4.scale(mvMatrix, [plane.scale, 4.9, plane.scale]);

    webgl_renderPerlinElements(genericCubeBuffer, [0, 1, 0], 20, false, 0.000005);
    webgl_restore();
  });
}