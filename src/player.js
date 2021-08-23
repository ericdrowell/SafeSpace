function player_init() {
  // start pos
  // TODO: these should all just be flat variables
  player = {
    isAirborne: false,
    pitch: -0.12,
    sideMovement: 0,
    straightMovement: 0,
    upVelocity: 0,
    x: -251.9,
    y: 26.5,
    yaw: 6.3,
    z: 45,
    isSafe: false
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
  return false;
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
    const r = sphereRadii;
    if (Math.pow(( x-cx ),2) + Math.pow((y-cy),2) + Math.pow((z-cz),2) < r*r) {
      return true;
    }
  }

  return false;
}

function player_update() {
  // if entering safe space
  if (!player.isSafe && player_inSafeSpace()) {
    soundEffects_play(SOUND_EFFECTS_ENTER_SAFE_SPACE);
    player.isSafe = true;
  }
  // if exiting safe space
  else if (player.isSafe && !player_inSafeSpace()) {
    soundEffects_play(SOUND_EFFECTS_EXIT_SAFE_SPACE);
    player.isSafe = false;
  }

  if (player_inNova()) {
    if (!player.isSafe) {
      soundEffects_play(SOUND_EFFECTS_EXPLOSION);
      gameState = GAME_STATE_DIED;
    }
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

  if (!player.isAirborne && (player.straightMovement || player.sideMovement)) {
    // bobble
    bobbleCounter += elapsedTime;
    bobble = BOBBLE_AMPLITUDE * Math.sin((bobbleCounter/1000) * BOBBLE_FREQUENCEY);

     // run sound
    playerStep -= elapsedTime;
    if (playerStep < 0) {
      playerStep = PLAYER_STEP_SPEED;
      soundEffects_play(SOUND_EFFECTS_RUN);
    }

  }

  // handle gravity
  player.upVelocity += GRAVITY * elapsedTime / 1000;
  let distEachFrame = player.upVelocity * elapsedTime / 1000;
  world_moveObject(player, 0, distEachFrame, 0);  
};

function player_jump() {
  if (!player.isAirborne) {
    player.upVelocity = JUMP_SPEED;
    player.isAirborne = true;
    soundEffects_play(SOUND_EFFECTS_JUMP);
  }
}
