function world_addSafeSpace(x, y, z) {
  const startX = x - SAFE_SPACE_SIZE;
  const endX = x + SAFE_SPACE_SIZE;
  const startY = y - SAFE_SPACE_SIZE;
  const endY = y + SAFE_SPACE_SIZE;
  const startZ = z - SAFE_SPACE_SIZE;
  const endZ = z + SAFE_SPACE_SIZE;


  const texture = TEXTURES_RUST;
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

function world_addReactor(x, y, z, timeToNextBurst, burstDelay) {
  reactors.push({
    x: x,
    y: y,
    z: z,
    burstDelay: burstDelay,
    timeToNextBurst: timeToNextBurst
  });

  nova_addBurst({
    x: x,
    y: y,
    z: z,
    isCore: true
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

function world_addSafeRoom(startX, endX, startY, endY, startZ, endZ) {
  safeRooms.push([startX, endX, startY, endY, startZ, endZ]);
  world_addRoom(startX, endX, startY, endY, startZ, endZ)
}

function world_addRoom(startX, endX, startY, endY, startZ, endZ) {
  world_addFloor(startX, endX, startY, startZ, endZ);
  world_addCeiling(startX, endX, endY, startZ, endZ);
  world_addWallXY(startX, endX, startY, endY, startZ, startZ);
  world_addWallXY(startX, endX, startY, endY, endZ, endZ);
  world_addWallYZ(startX, startY, endY, startZ, endZ);
  world_addWallYZ(endX, startY, endY, startZ, endZ);
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

function world_addWallXY(startX, endX, startY, endY, z) {
  world_addBlocks(startX, endX, startY, endY, z, z, TEXTURES_WALL);
}

function world_addWallYZ(x, startY, endY, startZ, endZ) {
  world_addBlocks(x, x, startY, endY, startZ, endZ, TEXTURES_WALL);
}

function world_addFloor(startX, endX, y, startZ, endZ, texture) {
  for (let x=startX; x<=endX; x++) {
    for (let z=startZ; z<=endZ; z++) {
      world_addBlock(x, y, z, texture);
    }
  }
}

function world_addFloor(startX, endX, y, startZ, endZ) {
  for (let x=startX; x<=endX; x++) {
    for (let z=startZ; z<=endZ; z++) {
      let texture = x % 8 === 0 || z % 8 === 0 ? TEXTURES_METAL : TEXTURES_METAL_GRATES
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

function world_addDoorBorder(x, y, z, texture) {
  world_addBlocks(x-5, x-4, y+1, y+1, z, z, texture);
  world_addBlocks(x+4, x+5, y+1, y+1, z, z, texture);

  world_addBlocks(x-6, x-5, y+2, y+2, z, z, texture);
  world_addBlocks(x+5, x+6, y+2, y+2, z, z, texture);

  world_addBlocks(x-7, x-6, y+3, y+3, z, z, texture);
  world_addBlocks(x+6, x+7, y+3, y+3, z, z, texture);

  // center
  world_addBlocks(x-7, x-7, y+4, y+7, z, z, texture);
  world_addBlocks(x+7, x+7, y+4, y+7, z, z, texture);

  world_addBlocks(x-7, x-6, y+8, y+8, z, z, texture);
  world_addBlocks(x+6, x+7, y+8, y+8, z, z, texture);

  world_addBlocks(x-6, x-5, y+9, y+9, z, z, texture);
  world_addBlocks(x+5, x+6, y+9, y+9, z, z, texture);

  world_addBlocks(x-5, x-4, y+10, y+10, z, z, texture);
  world_addBlocks(x+4, x+5, y+10, y+10, z, z, texture);

  // top bottom
  world_addBlocks(x-4, x+4, y, y, z, z, texture);
  world_addBlocks(x-4, x+4, y+11, y+11, z, z, texture);
};

function world_addDoorHoleXY(x, y, z) {
  world_removeBlocks(x-4, x+4, y, y+10, z, z);
  world_removeBlocks(x-6, x+6, y+2, y+8, z, z);
  world_addDoorBorder(x, y, z, TEXTURES_LIGHT_BARS);
}

function world_addCeiling(startX, endX, y, startZ, endZ) {
  world_addBlocks(startX, endX, y, y, startZ, endZ, TEXTURES_METAL_RIDGES);
}

function world_addDoorXY(x, y, z) {
  world_addDoorBorder(x, y-1, z+2, TEXTURES_RUST);
  world_addDoorHoleXY(x, y-1, z+1);
  door_add(x, y, z);
  world_addDoorHoleXY(x, y-1, z-1);
  world_addDoorBorder(x, y-1, z-2, TEXTURES_RUST);
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
