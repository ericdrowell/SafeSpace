function userInputs_init() {
  document.addEventListener('keydown', function(evt) {
    userInputs_handleKeyDown(evt);
  }, false);
  
  document.addEventListener('keyup', function(evt) {
    userInputs_handleKeyUp(evt);
  }, false);

  document.addEventListener('mousemove', function(evt) {
    userInputs_handleMouseMove(evt);
  }, false);

  hudCanvas.addEventListener('mousedown', function(evt) {
    userInputs_handleMouseDown(evt);
  }, false);

  document.addEventListener('pointerlockchange', function(evt) {
    if (!userInputs_isPointerLocked() && gameState === GAME_STATE_PLAYING) {
      hudDirty = true;
      game_pause();
    }
  }, false);
};

function userInputs_handleKeyDown(evt) {

  let keycode = ((evt.which) || (evt.keyCode));

  switch (keycode) {
    case 65:
      // a key (strafe left)
      if (gameState === GAME_STATE_PLAYING) {
        player.sideMovement = -1;
      }
      break;
    case 87:
      // w key (move forward)
      if (gameState === GAME_STATE_PLAYING) {
        player.straightMovement = 1;
      }
      break;
    case 68:
      // d key (strafe right)
      if (gameState === GAME_STATE_PLAYING) {
        player.sideMovement = 1;
      }
      break;
    case 83: 
      // s key (move backwards)
      if (gameState === GAME_STATE_PLAYING) {
        player.straightMovement = -1;
      }
      break;
    case 32:
      player_jump();
      break;
    case 82:
      // r key (reload)
      hudDirty = true;
      player_reload();
      break;
  }
};

function userInputs_handleKeyUp(evt) {
  if (gameState === GAME_STATE_PLAYING) {
    let keycode = ((evt.which) || (evt.keyCode));

    switch (keycode) {
      case 65:
        // a key
        player.sideMovement = 0;
        break;
      case 87:
        // w key
        player.straightMovement = 0;
        
        break;
      case 68:
        // d key
        player.sideMovement = 0;
        break;
      case 83:
        // s key
        player.straightMovement = 0;
        break;
    }
  }
};

function userInputs_handleMouseMove(evt) {
  if (gameState === GAME_STATE_PLAYING) {
    if (userInputs_isPointerLocked()) {
      // pitch (up and down)
      player.pitch += evt.movementY * Math.PI * 0.001 * -1;
      if (player.pitch > Math.PI/2) {
        player.pitch = Math.PI/2;
      }
      if (player.pitch < -1 * Math.PI/2) {
        player.pitch = -1 * Math.PI/2;
      }

      // yaw (side to side)
      player.yaw += evt.movementX * Math.PI * 0.001 * -1;
    }
  }
}

function userInputs_handleMouseDown() {
  if (clickBlock === 0) {
    if (gameState === GAME_STATE_PAUSED) {
      hudCanvas.requestPointerLock();
      hudDirty = true;
      game_resume();
    }
    else if (gameState === GAME_STATE_DIED || gameState === GAME_STATE_WIN) {
      hudDirty = true;
      game_restart()
    }
  }
}

function userInputs_isPointerLocked() {
  return document.pointerLockElement === hudCanvas;
}