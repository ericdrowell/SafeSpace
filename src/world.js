function world_addSafeSpace(x, y, z) {
  const startX = x - SAFE_SPACE_SIZE;
  const endX = x + SAFE_SPACE_SIZE;
  const startY = y - SAFE_SPACE_SIZE;
  const endY = y + SAFE_SPACE_SIZE;
  const startZ = z - SAFE_SPACE_SIZE;
  const endZ = z + SAFE_SPACE_SIZE;


  const texture = TEXTURES_METAL_PLATE_WITH_BOLTS;
  // bottom
  world_addBlocks(startX, endX, startY, startY, startZ, endZ, texture);

  // side beams
  world_addBlocks(startX, startX, startY+1, endY, startZ, startZ, texture);
  world_addBlocks(endX, endX, startY+1, endY, startZ, startZ, texture);
  world_addBlocks(startX, startX, startY+1, endY, endZ, endZ, texture);
  world_addBlocks(endX, endX, startY+1, endY, endZ, endZ, texture);

  // top beams
  world_addBlocks(startX, startX, endY, endY, startZ+1, endZ-1, texture);
  world_addBlocks(endX, endX, endY, endY, startZ+1, endZ-1, texture);
  world_addBlocks(startX+1, endX-1, endY, endY, startZ, startZ, texture);
  world_addBlocks(startX+1, endX-1, endY, endY, endZ, endZ, texture);

  // fields
  world_addField(x, y, z);
}

function world_addField(x, y, z) {
  worldFields.push({
    x: x,
    y: y,
    z: z
  });
}

function world_addSphere(x, y, z) {
  worldSpheres.push({
    x: x,
    y: y,
    z: z
  });
}


function world_addSlope(startX, endX, endY, startZ, endZ, texture) {
  let y = endY;
  for (let x = startX; x <= endX; x++) {
    world_addBlocks(x, x, y, y, startZ, endZ, texture); 
    y--;
  }
}

function world_addRing(x, y, z, texture) {
  // bottom of ring
  world_addBlocks(x, x, y, y, z-2, z+2, texture);

  // far side
  world_addBlocks(x, x, y+3, y+7, z-5, z-5, texture);

  // top of ring
  world_addBlocks(x, x, y+10, y+10, z-2, z+2, texture);

  // near side
  world_addBlocks(x, x, y+3, y+7, z+5, z+5, texture);

  // fillers
  world_addBlock(x, y+1, z-3, texture);
  world_addBlock(x, y+2, z-4, texture);

  world_addBlock(x, y+1, z+3, texture);
  world_addBlock(x, y+2, z+4, texture);

  world_addBlock(x, y+8, z-4, texture);
  world_addBlock(x, y+9, z-3, texture);

  world_addBlock(x, y+8, z+4, texture);
  world_addBlock(x, y+9, z+3, texture);
}

function world_addTunnel(startX, endX, startY, endY, startZ, endZ, texture) {
  let diffX = endX - startX;
  let diffY = endY - startY;
  let diffZ = endZ - startZ;

  for (let x=startX; x<=endX; x++) {
    let y = Math.round(startY + (((x - startX) / diffX) * diffY));
    let z = Math.round(startZ + (((x - startX) / diffX) * diffZ));

    world_addRing(x, y, z, texture);
  }
}

function world_addRoom(startX, endX, startY, endY, startZ, endZ) {
  // floor
  world_addGrateFloor(startX, endX, startY, startZ, endZ);

  // walls
  let wallTexture = TEXTURES_METAL_PANELS;
  world_addBlocks(startX, endX, startY, endY, endZ, endZ, wallTexture);
  world_addBlocks(startX, endX, startY, endY, startZ, startZ, wallTexture);
  world_addBlocks(startX, startX, startY, endY, startZ, endZ, wallTexture);
  world_addBlocks(endX, endX, startY, endY, startZ, endZ, wallTexture);

  // ceiling
  world_addBlocks(startX, endX, endY, endY, startZ, endZ, TEXTURES_METAL_RIDGES);


}

function world_addBlocks(startX, endX, startY, endY, startZ, endZ, texture) {
  for (let x=startX; x<=endX; x++) {
    for (let y=startY; y<=endY; y++) {
      for (let z=startZ; z<=endZ; z++) {
        world_addBlock(x, y, z, texture);
      }
    }
  }
}

function world_addFloor(startX, endX, y, startZ, endZ, texture) {
  for (let x=startX; x<=endX; x++) {
    for (let z=startZ; z<=endZ; z++) {
      world_addBlock(x, y, z, texture);
    }
  }
}

function world_addGrateFloor(startX, endX, y, startZ, endZ) {
  for (let x=startX; x<=endX; x++) {
    for (let z=startZ; z<=endZ; z++) {
      let texture = x % 8 === 0 || z % 8 === 0 ? TEXTURES_METAL_PLATE : TEXTURES_METAL_GRATES
      world_addBlock(x, y, z, texture);
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

function world_addHexHoleXY(startX, endX, startY, endY, z) {
  const mainHoleSize = 4;
  const centerX = (endX+startX)/2;
  const centerY = (endY+startY)/2;

  const wallTexture = TEXTURES_METAL_RIDGES;

  world_addBlocks(startX, centerX-mainHoleSize-1, startY+1, startY+1, z, z, wallTexture);
  world_addBlocks(centerX+mainHoleSize+1, endX, startY+1, startY+1, z, z, wallTexture);
  world_addBlocks(startX, centerX-mainHoleSize-2, startY+2, startY+2, z, z, wallTexture);
  world_addBlocks(centerX+mainHoleSize+2, endX, startY+2, startY+2, z, z, wallTexture);
  world_addBlocks(startX, centerX-mainHoleSize-3, startY+3, startY+3, z, z, wallTexture);
  world_addBlocks(centerX+mainHoleSize+3, endX, startY+3, startY+3, z, z, wallTexture);

  world_addBlocks(startX, centerX-mainHoleSize-3, startY+7, startY+7, z, z, wallTexture);
  world_addBlocks(centerX+mainHoleSize+3, endX, startY+7, startY+7, z, z, wallTexture);
  world_addBlocks(startX, centerX-mainHoleSize-2, startY+8, startY+8, z, z, wallTexture);
  world_addBlocks(centerX+mainHoleSize+2, endX, startY+8, startY+8, z, z, wallTexture);
  world_addBlocks(startX, centerX-mainHoleSize-1, startY+9, startY+9, z, z, wallTexture);
  world_addBlocks(centerX+mainHoleSize+1, endX, startY+9, startY+9, z, z, wallTexture);

  world_addBlocks(startX, centerX-7, centerY-1, centerY+1, z, z, wallTexture);
  world_addBlocks(centerX+7, endX, centerY-1, centerY+1, z, z, wallTexture);

  // add lights

  world_addBlock(centerX-6, centerY+2, z, TEXTURES_LIGHT);
  world_addBlock(centerX-6, centerY-2, z, TEXTURES_LIGHT);
  world_addBlock(centerX-5, centerY+3, z, TEXTURES_LIGHT);
  world_addBlock(centerX-5, centerY-3, z, TEXTURES_LIGHT);
  world_addBlock(centerX-4, centerY+4, z, TEXTURES_LIGHT);
  world_addBlock(centerX-4, centerY-4, z, TEXTURES_LIGHT);

  world_addBlock(centerX+6, centerY+2, z, TEXTURES_LIGHT);
  world_addBlock(centerX+6, centerY-2, z, TEXTURES_LIGHT);
  world_addBlock(centerX+5, centerY+3, z, TEXTURES_LIGHT);
  world_addBlock(centerX+5, centerY-3, z, TEXTURES_LIGHT);
  world_addBlock(centerX+4, centerY+4, z, TEXTURES_LIGHT);
  world_addBlock(centerX+4, centerY-4, z, TEXTURES_LIGHT);

  

  world_addBlocks(centerX-7, centerX-7, centerY-1, centerY+1, z, z, TEXTURES_LIGHT);
  world_addBlocks(centerX+7, centerX+7, centerY-1, centerY+1, z, z, TEXTURES_LIGHT);
  world_addBlocks(centerX-3, centerX+3, startY, startY, z, z, TEXTURES_LIGHT);






}

function world_removeBlocks(startX, endX, startY, endY, startZ, endZ) {
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
        player_jumpNum = 0;
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
