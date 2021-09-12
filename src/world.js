function world_addSafeSpace(x, y, z) {
  const startX = x - SAFE_SPACE_SIZE;
  const endX = x + SAFE_SPACE_SIZE;
  const startY = y - SAFE_SPACE_SIZE;
  const endY = y + SAFE_SPACE_SIZE;
  const startZ = z - SAFE_SPACE_SIZE;
  const endZ = z + SAFE_SPACE_SIZE;


  const texture = TEXTURES_NINE_BOLT_METAL;

  world_addBlocks(startX, endX, startY, endY, startZ, endZ, texture);
  world_removeBlocks(startX, endX, startY+1, endY-1, startZ+1, endZ-1);
  world_removeBlocks(startX+1, endX-1, startY+1, endY, startZ+1, endZ-1);
  world_removeBlocks(startX+1, endX-1, startY+1, endY-1, startZ, endZ);


  // fields
  world_addField(x, y, z);
}

function world_addCrate(x, y, z) {
  const crateSize = 1;
  const startX = x - crateSize;
  const endX = x + crateSize + 1;
  const startY = y;
  const endY = y + crateSize*2 + 1;
  const startZ = z - crateSize;
  const endZ = z + crateSize + 1;

  world_addBlocks(startX, endX, startY, endY, startZ, endZ, TEXTURES_GREEN_METAL);
  world_addBlocks(startX+1, endX-1, startY+1, endY-1, startZ, endZ, TEXTURES_METAL_RIDGES);
  world_addBlocks(startX+1, endX-1, startY, endY, startZ+1, endZ-1, TEXTURES_METAL_RIDGES);
  world_addBlocks(startX, endX, startY+1, endY-1, startZ+1, endZ-1, TEXTURES_METAL_RIDGES);
}

function world_addField(x, y, z) {
  worldFields.push({
    x: x,
    y: y,
    z: z
  });
}

function world_addReactor(x, startY, coreY, endY, z, timeToNextBurst, burstDelay) {
  reactors.push({
    x: x,
    y: coreY,
    z: z,
    burstDelay: burstDelay,
    timeToNextBurst: timeToNextBurst
  });

  nova_addBurst({
    x: x,
    y: coreY,
    z: z,
    isCore: true
  });

  // bottom column
  world_addBlocks(x-1, x+1, startY, coreY-3, z-1, z+1, TEXTURES_NINE_BOLT_METAL);
  // top column
  world_addBlocks(x-1, x+1, coreY+3, endY, z-1, z+1, TEXTURES_NINE_BOLT_METAL);

  world_addReactorClaws(x, coreY-2, z, 2);
  world_addReactorClaws(x, coreY-1, z, 3);
  world_addReactorClaws(x, coreY+2, z, 3);
  world_addReactorClaws(x, coreY+3, z, 2);

  world_addFrame(x-2, x+2, startY, z-2, z+2);
  world_addFrame(x-2, x+2, endY, z-2, z+2);

}

function world_addReactorClaws(x, y, z, radius) {
  world_addBlocks(x-radius, x-radius, y-1, y, z, z, TEXTURES_NINE_BOLT_METAL);
  world_addBlocks(x+radius, x+radius, y-1, y, z, z, TEXTURES_NINE_BOLT_METAL);

  world_addBlocks(x, x, y-1, y, z-radius, z-radius, TEXTURES_NINE_BOLT_METAL);
  world_addBlocks(x, x, y-1, y, z+radius, z+radius, TEXTURES_NINE_BOLT_METAL);
}

function world_addStairs(startX, endX, startY, z, startZDepth, zDirection) {
  let y = startY+1;
  let zDepth = startZDepth;
  while (zDepth > 0) {
    if (zDirection === 1) {
      world_addBlocks(startX, endX, y, y, z, z+zDepth, TEXTURES_WALL); 
      world_addBlocks(startX, endX, y, y, z+zDepth, z+zDepth, TEXTURES_CAUTION_STRIPES);
    }
    else {
      world_addBlocks(startX, endX, y, y, z-zDepth, z, TEXTURES_WALL); 
      world_addBlocks(startX, endX, y, y, z-zDepth, z-zDepth, TEXTURES_CAUTION_STRIPES);
    }
    y++;
    zDepth--;
  }

  world_addFrame(startX-1, endX+1, startY, z-1, z+startZDepth*zDirection);
}

function world_addPlatform(startX, endX, startY, endY, startZ, endZ) {
  world_addBlocks(startX, endX, startY, endY, startZ, startZ, TEXTURES_WALL);
  world_addBlocks(startX, endX, startY, endY, endZ, endZ, TEXTURES_WALL);
  world_addBlocks(startX, startX, startY, endY, startZ, endZ, TEXTURES_WALL);
  world_addBlocks(endX, endX, startY, endY, startZ, endZ, TEXTURES_WALL);

  world_addFrame(startX, endX, endY, startZ, endZ);
  world_addFloor(startX+1, endX-1, endY, startZ+1, endZ-1);
  world_addFrame(startX-1, endX+1, startY, startZ-1, endZ+1);
}

function world_addFrame(startX, endX, y, startZ, endZ) {
  world_addBlocks(startX, endX, y, y, startZ, endZ, TEXTURES_CAUTION_STRIPES);
}

function world_addStartRoom(startX, endX, startY, endY, startZ, endZ) {
  world_addTransitionRoom(startX, endX, startY, endY, startZ, endZ, true);
  startZone = endZ + 30;
}

function world_addThreeCratesXY(x, y, z) {
  world_addCrate(x+5, y, z);
  world_addCrate(x, y, z);
  world_addCrate(x-4, y, z+1);
}

function world_addTwoCratesYZ(x, y, z) {
  world_addCrate(x+1, y, z-2);
  world_addCrate(x, y, z+3);
}

function world_addThreeCratePileYZ(x, y, z) {
  world_addTwoCratesYZ(x, y, z)
  world_addCrate(x+1, y+4, z);
}

function world_addCratesPile(x, y, z) {
  world_addThreeCratesXY(x-1, y, z-4)
  world_addThreeCratesXY(x+1, y, z)
  world_addThreeCratesXY(x, y, z+5);

  world_addThreeCratePileYZ(x-2, y+4, z);
  world_addThreeCratePileYZ(x+2, y+4, z-1);
}

function world_addEndRoom(startX, endX, startY, endY, startZ, endZ) {
  world_addTransitionRoom(startX, endX, startY, endY, startZ, endZ, false);
  endZone = startZ + 10;
}

function world_addTransitionRoom(startX, endX, startY, endY, startZ, endZ, isStartRoom) {
  world_addRoom(startX, endX, startY, endY, startZ, endZ);
  world_removeBlocks(startX+1, endX-1, startY+1, endY-1, startZ, startZ);
  world_removeBlocks(startX+1, endX-1, startY+1, endY-1, endZ, endZ);

  // doors
  world_addWallXY(startX, endX, startY, endY, endZ-1);
  world_addDoor((endX+startX)/2, startY+2, endZ, isStartRoom);

  world_addWallXY(startX, endX, startY, endY, startZ+1);
  world_addDoor((endX+startX)/2, startY+2, startZ, !isStartRoom);  
}

function world_addRoom(startX, endX, startY, endY, startZ, endZ) {
  world_addWallXY(startX, endX, startY, endY, startZ, startZ);
  world_addWallXY(startX, endX, startY, endY, endZ, endZ);
  world_addWallYZ(startX, startY, endY, startZ, endZ);
  world_addWallRidgesYZ(startX+1, startY, endY, startZ, endZ);
  world_addWallRidgesYZ(endX-2, startY, endY, startZ, endZ);
  world_addWallYZ(endX, startY, endY, startZ, endZ);
  world_addCeiling(startX, endX, endY, startZ, endZ);
  world_addPipes(endX-1, endY-2, startZ, endZ);
  world_addDuct(startX+4, endY-4, startZ, endZ);
  world_addFloor(startX, endX, startY, startZ, endZ);
}

function world_addPyramidPlatform(x, startY, endY, z) {
  world_addPlatform(x-5, x+5, startY, endY-4, z-5, z+5);
  world_addPlatform(x-4, x+4, endY-4, endY, z-4, z+4);
}

function world_addPoisonRoom(startX, endX, startY, endY, startZ, endZ) {
  world_addRoom(startX, endX, startY, endY, startZ, endZ);

  poisonPlanes.push({
    x: (startX + endX)/2,
    y: startY+3,
    z: (startZ + endZ)/2,
    scale: Math.max(startX-endX, endZ-startZ)
  });
}

function world_addPipes(x, y, startZ, endZ) {
  world_addBlocks(x, x, y, y, startZ, endZ, TEXTURES_RED_PIPE);
  world_addBlocks(x, x, y-2, y-2, startZ, endZ, TEXTURES_BLUE_PIPE);

  world_addBlocks(x, x, y-8, y-8, startZ, endZ, TEXTURES_RED_PIPE);
  world_addBlocks(x, x, y-10, y-10, startZ, endZ, TEXTURES_BLUE_PIPE);
}

function world_addDuct(x, y, startZ, endZ) {
  world_addBlocks(x-1, x+1, y-1, y+1, startZ, endZ, TEXTURES_METAL_DUCT);
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
  world_addBlocks(startX, endX, startY, endY, z, z, TEXTURES_METAL_RIDGES);
}

function world_addWallYZ(x, startY, endY, startZ, endZ) {
  world_addBlocks(x, x, startY, endY, startZ, endZ, TEXTURES_METAL_RIDGES);
}

function world_addWallRidgesYZ(x, startY, endY, startZ, endZ) {
  for (let z = startZ; z<endZ; z++) {
    if (z % 8 ===0) {
      world_addBlocks(x, x+1, startY, endY, z, z, TEXTURES_WALL);
    }
  }
}

function world_addFloor(startX, endX, y, startZ, endZ) {
  let hasFloorPattern = endX - startX > 16 && endZ - startZ > 16;
  for (let x=startX; x<=endX; x++) {
    for (let z=startZ; z<=endZ; z++) {
      let texture = (hasFloorPattern && (x % 8 === 0 || z % 8 === 0)) ? TEXTURES_METAL_RIDGES : TEXTURES_METAL_GRATES
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
  world_addBlocks(x-6, x+6, y, y+10, z, z, texture);
  world_removeBlocks(x-5, x+5, y+1, y+9, z, z);
};

function world_addCeiling(startX, endX, y, startZ, endZ) {
  world_addBlocks(startX, endX, y, y, startZ, endZ, TEXTURES_METAL_RIDGES);

  // ridges
  for (let z=startZ; z<endZ; z++) {
    if (z%8===0) {
      world_addBlocks(startX, endX, y-2, y, z, z, TEXTURES_WALL);
    }
  }

  // lights
  for (let x=startX; x<endX; x++) {
    for (let z=startZ; z<endZ; z++) {
      if ((z+4)%32===0 && (x+4)%16 === 0) {
        world_addBlocks(x-2, x+2, y-1, y-1, z-2, z+2, TEXTURES_WALL);
        world_addBlocks(x-1, x+1, y-1, y-1, z-1, z+1, TEXTURES_LIGHT_BARS);
      }
    }
  }


}

function world_addDoor(x, y, z, isActive) {
  world_addDoorBorder(x, y-1, z+3, TEXTURES_RUST);
  world_addDoorBorder(x, y-1, z+2, TEXTURES_RUST);
  world_addDoorBorder(x, y-1, z-1, TEXTURES_LIGHT_BARS);
  door_add(x, y, z, isActive);
  world_addDoorBorder(x, y-1, z+1, TEXTURES_LIGHT_BARS);
  world_addDoorBorder(x, y-1, z-2, TEXTURES_RUST);
  world_addDoorBorder(x, y-1, z-3, TEXTURES_RUST);

  

  if (!isActive) {
    world_addBlocks(x-10, x+10, y-10, y+10, z, z, TEXTURES_INVISIBLE);
  }
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
  let yOffset = yChange > 0 ? PLAYER_HEIGHT+1 : 0;

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
