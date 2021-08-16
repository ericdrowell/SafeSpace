function world_init() {
  world_buildModel();
  world_buildBuffers();
}

function world_buildModel() {

  // -------------------- LEVEL 1 --------------------
  world_addRoom(-290, -241, 26, 42, -10, 50, TEXTURES_PURPLE_STONE, TEXTURES_BIO_PURPLE, TEXTURES_ROTTING_WOOD);
  world_addSafeSpace(-262, -251, 27, 36, 18, 27);


}

// utils
function world_addPillar(x, y, z, height) {
  world_addPole(x-1, y, z, height);
  world_addPole(x+1, y, z, height);
  world_addPole(x, y, z-1, height);
  world_addPole(x, y, z+1, height);
}

function world_addPillars(startX, endX, startY, endY, startZ, endZ) {
  for (let x = startX+20; x<endX; x+=20) {
    for (let z = startZ+20; z<endZ; z+=20) {
      world_addPillar(x, startY, z, endY-startY);
    }
  }
}

function world_addDoor(startX, endX, startY, endY, startZ, endZ) {
  world_addPlane(startX-1, endX+1, startY, endY+1, startZ, endZ, TEXTURES_ROTTING_WOOD);
  world_addPlane(startX, endX, startY, endY, startZ, endZ, TEXTURES_DIRTY_GRAY);
  world_addBlock(startX, startY + Math.round((endY-startY)/2), startZ, TEXTURES_DOOR_KNOB);
}

function world_addTable(startX, endX, startY, endY, startZ, endZ) {
  // invisble 
  world_addPlane(startX, endX, startY, endY, startZ, endZ, TEXTURES_INVISIBLE);

  // legs
  world_addPlane(startX, startX, startY, endY-1, startZ, startZ, TEXTURES_STONE);
  world_addPlane(endX, endX, startY, endY-1, startZ, startZ, TEXTURES_STONE);
  world_addPlane(startX, startX, startY, endY-1, endZ, endZ, TEXTURES_STONE);
  world_addPlane(endX, endX, startY, endY-1, endZ, endZ, TEXTURES_STONE);

  // table top
  world_addPlane(startX, endX, endY, endY, startZ, endZ, TEXTURES_ROTTING_WOOD);
}

function world_addSafeSpace(startX, endX, startY, endY, startZ, endZ) {
  // bottom
  world_addPlane(startX, endX, startY, startY, startZ, endZ, TEXTURES_STONE);

  // side beams
  world_addPlane(startX, startX, startY+1, endY, startZ, startZ, TEXTURES_STONE);
  world_addPlane(endX, endX, startY+1, endY, startZ, startZ, TEXTURES_STONE);
  world_addPlane(startX, startX, startY+1, endY, endZ, endZ, TEXTURES_STONE);
  world_addPlane(endX, endX, startY+1, endY, endZ, endZ, TEXTURES_STONE);

  // top beams
  world_addPlane(startX, startX, endY, endY, startZ+1, endZ-1, TEXTURES_STONE);
  world_addPlane(endX, endX, endY, endY, startZ+1, endZ-1, TEXTURES_STONE);
  world_addPlane(startX+1, endX-1, endY, endY, startZ, startZ, TEXTURES_STONE);
  world_addPlane(startX+1, endX-1, endY, endY, endZ, endZ, TEXTURES_STONE);



}

function world_addPole(x, y, z, height) {
  world_addPlane(x-1, x+1, y, y, z-1, z+1, TEXTURES_STONE);
  world_addPlane(x, x, y, y+height, z, z, TEXTURES_STONE);
  world_addPlane(x-1, x+1, y+height, y+height, z-1, z+1, TEXTURES_STONE);
}

function world_addSlope(startX, endX, endY, startZ, endZ) {
  let y = endY;
  for (let x = startX; x <= endX; x++) {
    world_addPlane(x, x, y, y, startZ, endZ, TEXTURES_ROTTING_WOOD); 
    y--;
  }
}

function world_addRing(x, y, z) {
  // bottom of ring
  world_addPlane(x, x, y, y, z-2, z+2, TEXTURES_DIRT);

  // far side
  world_addPlane(x, x, y+3, y+7, z-5, z-5, TEXTURES_DIRT);

  // top of ring
  world_addPlane(x, x, y+10, y+10, z-2, z+2, TEXTURES_DIRT);

  // near side
  world_addPlane(x, x, y+3, y+7, z+5, z+5, TEXTURES_DIRT);

  // fillers
  world_addBlock(x, y+1, z-3, TEXTURES_DIRT);
  world_addBlock(x, y+2, z-4, TEXTURES_DIRT);

  world_addBlock(x, y+1, z+3, TEXTURES_DIRT);
  world_addBlock(x, y+2, z+4, TEXTURES_DIRT);

  world_addBlock(x, y+8, z-4, TEXTURES_DIRT);
  world_addBlock(x, y+9, z-3, TEXTURES_DIRT);

  world_addBlock(x, y+8, z+4, TEXTURES_DIRT);
  world_addBlock(x, y+9, z+3, TEXTURES_DIRT);
}

function world_addTunnel(startX, endX, startY, endY, startZ, endZ) {
  let diffX = endX - startX;
  let diffY = endY - startY;
  let diffZ = endZ - startZ;

  for (let x=startX; x<=endX; x++) {
    let y = Math.round(startY + (((x - startX) / diffX) * diffY));
    let z = Math.round(startZ + (((x - startX) / diffX) * diffZ));

    world_addRing(x, y, z);
  }
}

function world_addRoom(startX, endX, startY, endY, startZ, endZ, floorTexture, wallTexture, celingTexture) {
  // floor
  world_addPlane(startX, endX, startY, startY, startZ, endZ, floorTexture);

  // walls
  world_addPlane(startX, endX, startY, endY, endZ, endZ, wallTexture);
  world_addPlane(startX, endX, startY, endY, startZ, startZ, wallTexture);
  world_addPlane(startX, startX, startY, endY, startZ, endZ, wallTexture);
  world_addPlane(endX, endX, startY, endY, startZ, endZ, wallTexture);

  // ceiling
  world_addPlane(startX, endX, endY, endY, startZ, endZ, celingTexture);

}

function world_addPlane(startX, endX, startY, endY, startZ, endZ, texture) {
  for (let x=startX; x<=endX; x++) {
    for (let y=startY; y<=endY; y++) {
      for (let z=startZ; z<=endZ; z++) {
        world_addBlock(x, y, z, texture);
      }
    }
  }
}

function world_addBlock(x, y, z, texture) {
  if (world[x] === undefined) {
    world[x] = [];
  }
  if (world[x][y] === undefined) {
    world[x][y] = [];
  }

  world[x][y][z] = {
    texture: texture
  };
}

function world_removePlane(startX, endX, startY, endY, startZ, endZ) {
  for (let x=startX; x<=endX; x++) {
    for (let y=startY; y<=endY; y++) {
      for (let z=startZ; z<=endZ; z++) {
        world_removeBlock(x, y, z);
      }
    }
  }
}

function world_removeBlock(x, y, z) {
  if (world[x] && world[x][y] && world[x][y][z]) {
    delete world[x][y][z];
  }
}

function world_buildBuffers() {
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

function world_render() {
  for (let texture in worldBuffers) {
    worldBuffers[texture].forEach(function(buffer) {
      scene_render(buffer, textures[texture].glTexture);
    });
  }   
}

function world_getBlock(x, y, z) {
  x = Math.round(x);
  y = Math.round(y);
  z = Math.round(z);

  let block = world[x] && world[x][y] && world[x][y][z];

  if (block) {
    return {
      x: x,
      y: y,
      z: z,
      texture: block.texture
    };
  }
  else {
    return null;
  }
}

// use ray tracing to find collisions
function world_moveObject(object, xChange, yChange, zChange) {
  
  let newX = object.x;
  let newY = object.y;
  let newZ = object.z;

  

  // y movement
  let yChangeAbs = Math.abs(yChange);
  let ySign = Math.sign(yChange);
  let yOffset = yChange > 0 ? PLAYER_HEIGHT : 0;

  // down movement
  
  for (let y=0; y<yChangeAbs+RAY_TRACE_INCREMENT; y+=RAY_TRACE_INCREMENT) {
    if (y > yChangeAbs) {
      y = yChangeAbs;
    }
    let block = world_getBlock(object.x, object.y + y*ySign + yOffset, object.z);
    if (block) {
      object.upVelocity = 0;

      // if landed on block
      if (yChange < 0) {
        object.isAirborne = false;
      }
      
      break;
    }
    else {
      newY = object.y + y*ySign;
    }
  }
  

  // x movement
  let xChangeAbs = Math.abs(xChange);
  let xSign = Math.sign(xChange);
  for (let x=0; x<xChangeAbs+RAY_TRACE_INCREMENT; x+=RAY_TRACE_INCREMENT) {
    if (x > xChangeAbs) {
      x = xChangeAbs;
    }
    let block = world_getBlock(object.x + x*xSign + 0.5*xSign, newY, object.z);
    if (block) {
      // handle auto up step
      let blockAboveStep = world_getBlock(object.x + x*xSign + 0.5*xSign, newY+1, object.z);
      if (!blockAboveStep) {
        newY += 1;
      }

      break;
    }
    else {
      newX = object.x + x*xSign;
    }


  }

  // z movement
  let zChangeAbs = Math.abs(zChange);
  let zSign = Math.sign(zChange);
  for (let z=0; z<zChangeAbs+RAY_TRACE_INCREMENT; z+=RAY_TRACE_INCREMENT) {
    if (z > zChangeAbs) {
      z = zChangeAbs;
    }
    let block = world_getBlock(newX, newY, object.z + z*zSign + 0.5*zSign);
    if (block) {
      // handle auto up step
      let blockAboveStep = world_getBlock(newX, newY+1, object.z + z*zSign + 0.5*zSign);
      if (!blockAboveStep) {
        newY += 1;
      }

      break;
    }
    else {
      newZ = object.z + z*zSign;
    }
  }

  object.x = newX;
  object.y = newY;
  object.z = newZ;


  
}
