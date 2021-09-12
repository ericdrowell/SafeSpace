function player_init() {
  // TODO: these should all just be flat variables
  player = {
    isAirborne: false,
    sideMovement: 0,
    straightMovement: 0,
    upVelocity: 0,
    pitch: 0
  };

  isPlayerSafe = false;
  playerEnteredLevel = false;
  bobble = 0;
  pitchBobble = 0;
  bobbleTime = 0;
  pitchBobbleTime = 0;
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

  return false;
}

function player_nearDoor(door) {
  let xDist = player.x - door.x;
  let yDist = player.y - door.y;
  let zDist = player.z - door.z;
  let dist = Math.sqrt(xDist*xDist + yDist*yDist + zDist*zDist);
  return dist < 20;
}

function player_inZone(zone) {
  return player.z > zone;
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
    isPlayerSafe = false;
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

  // handle poison
  for (let n=0; n<poisonPlanes.length; n++) {
    let plane = poisonPlanes[n];
    if (player.y < plane.y) {
      game_setState(GAME_STATE_DIED);
      break;
    }  
  }

  // handle zones
  if (player_inZone(startZone)) {
    if (!playerEnteredLevel) {
      playerEnteredLevel = true;
    }
  }
  if (player_inZone(endZone)) {
    soundEffects_play(SOUND_EFFECTS_WIN);
    // if last level, you won the game
    if (level === 3) {
      game_setState(GAME_STATE_WIN);
    }
    // otherwise go to next intro
    else {
      level++;
      game_setState(GAME_STATE_LEVEL_INTRO);
    }
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

  // handle rumble
  if (novaRumbleLeft > 0) {
    let offset = RUMBLE_MAX_OFFSET * novaRumbleLeft/NOVA_RUMBLE_DURATION;
    player.x += (Math.random() * offset - offset/2);
    player.z += (Math.random() * offset - offset/2);
  }

  console.log(Math.round(player.x), Math.round(player.y), Math.round(player.z));
};

function player_jump() {
  if (player_jumpNum < 1) {
    player.upVelocity = JUMP_SPEED;
    player.isAirborne = true;
    player_jumpNum++;
    soundEffects_play(SOUND_EFFECTS_JUMP);
  }
}
