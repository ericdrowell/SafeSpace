function player_init() {
  // TODO: these should all just be flat variables
  player = {
    isAirborne: false,
    sideMovement: 0,
    straightMovement: 0,
    upVelocity: 0,
    pitch: 0
  };
}

function player_inSafeSpace() {
  for (let n=0; n<worldFields.length; n++) {
    let field = worldFields[n];
    if (
      player.x > field.x - SAFE_SPACE_SIZE && player.x < field.x + SAFE_SPACE_SIZE &&
      player.y > field.y - SAFE_SPACE_SIZE && player.y < field.y + SAFE_SPACE_SIZE &&
      player.z > field.z - SAFE_SPACE_SIZE && player.z < field.z + SAFE_SPACE_SIZE
    ) {
      return true;
    }
  };

  for (let n=0; n<safeRooms.length; n++) {
    let safeRoom = safeRooms[n];
    if (
      player.x > safeRoom[0] && player.x < safeRoom[1]  &&
      player.y > safeRoom[2] && player.y < safeRoom[3]  &&
      player.z > safeRoom[4] && player.z < safeRoom[5]
    ) {
      return true;
    }
  };

  return false;
}

function player_nearDoor(door) {
  let xDist = player.x - door.x;
  let yDist = player.y - door.y;
  let zDist = player.z - door.z;
  let dist = Math.sqrt(xDist*xDist + yDist*yDist + zDist*zDist);
  return dist < 20;
}

function player_inNova() {
  for (let n=0; n<worldSpheres.length; n++) {
    let nova = worldSpheres[n];

    const x = player.x;
    const y = player.y;
    const z = player.z;
    const cx = nova.x;
    const cy = nova.y;
    const cz = nova.z;
    const r = novaRadius;
    if (Math.pow(( x-cx ),2) + Math.pow((y-cy),2) + Math.pow((z-cz),2) < r*r) {
      return true;
    }
  }

  return false;
}

function player_update() {
  // if entering safe space
  if (!isPlayerSafe && player_inSafeSpace()) {
    soundEffects_play(SOUND_EFFECTS_ENTER_SAFE_SPACE);
    isPlayerSafe = true;
  }
  // if exiting safe space
  else if (isPlayerSafe && !player_inSafeSpace()) {
    soundEffects_play(SOUND_EFFECTS_EXIT_SAFE_SPACE);
    if (!playerEnteredLevel) {
      nova_start();
      playerEnteredLevel = true;
    }
    
    isPlayerSafe = false;
  }

  // if entering nova
  if (!isPlayerInNova && player_inNova()) {
    if (isPlayerSafe) {
      soundEffects_play(SOUND_EFFECTS_FIELD_PROTECT);
    }
    else {
      game_setState(GAME_STATE_DIED);
    }

    isPlayerInNova = true;
  }
  // if exiting nova
  else if (isPlayerInNova && !player_inNova()) {
    isPlayerInNova = false;
  }

  // handle moving forward and backward
  if (player.straightMovement !== 0) {
    let direction = player.straightMovement === 1 ? -1 : 1;
    let distEachFrame = direction * PLAYER_SPEED * elapsedTime / 1000;
    world_moveObject(player, distEachFrame * Math.sin(player.yaw), 0, distEachFrame * Math.cos(player.yaw));
  }
  
   // handle strafe
  if (player.sideMovement !== 0) {
    let direction = player.sideMovement === 1 ? 1 : -1;
    let distEachFrame = direction * PLAYER_SPEED * elapsedTime / 1000;
    world_moveObject(player, distEachFrame * Math.sin(player.yaw + Math.PI / 2), 0, distEachFrame * Math.cos(player.yaw + Math.PI / 2));
  }

  if (!player.isAirborne) { 
    if (player.straightMovement || player.sideMovement) {
      // bobble
      bobbleTime += elapsedTime;
      bobble = RUN_BOBBLE_AMPLITUDE * Math.sin((bobbleTime/1000) * RUN_BOBBLE_FREQUENCEY);
      
       // run sound
      playerStep -= elapsedTime;
      if (playerStep < 0) {
        playerStep = PLAYER_STEP_SPEED;
        soundEffects_play(SOUND_EFFECTS_RUN);
      }
    }
    else {
      pitchBobbleTime += elapsedTime;
      pitchBobble = STAND_BOBBLE_AMPLITUDE * Math.sin((pitchBobbleTime/1000) * STAND_BOBBLE_FREQUENCEY);
    }
  }

  // handle gravity
  player.upVelocity += GRAVITY * elapsedTime / 1000;
  let distEachFrame = player.upVelocity * elapsedTime / 1000;
  world_moveObject(player, 0, distEachFrame, 0);  
};

function player_jump() {
  if (player_jumpNum < 2) {
    player.upVelocity = JUMP_SPEED;
    player.isAirborne = true;
    player_jumpNum++;
    soundEffects_play(SOUND_EFFECTS_JUMP);
  }
}
