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
    userInputs_handlePointerlockChange(evt);
  }, false);
};

function userInputs_handleKeyDown(evt) {
  if (gameState === GAME_STATE_PLAYING) {
    let keycode = ((evt.which) || (evt.keyCode));

    // https://w3c.github.io/pointerlock/#dfn-engagement-gesture
    game_requestPointerLock()

    switch (keycode) {
      case 27:
        // esc key
        // NOTE: this code line is only reached if there was a problem with pointer lock
        // and player is in playing state without pointer lock
        game_setState(GAME_STATE_PAUSED);
        break;
      case 65:
        // a key (strafe left)
        player.sideMovement = -1;
        break;
      case 87:
        // w key (move forward)
        player.straightMovement = 1;
        break;
      case 68:
        // d key (strafe right)
        player.sideMovement = 1;
        break;
      case 83: 
        // s key (move backwards)
        player.straightMovement = -1;
        break;
      case 32:
        player_jump();
        break;
    }
  }
};

function userInputs_handleKeyUp(evt) {
  if (gameState === GAME_STATE_PLAYING) {
    let keycode = ((evt.which) || (evt.keyCode));

    // https://w3c.github.io/pointerlock/#dfn-engagement-gesture
    game_requestPointerLock()

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
    if (game_isPointerLocked()) {
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

function userInputs_handlePointerlockChange(evt) {
  if (!game_isPointerLocked() && gameState === GAME_STATE_PLAYING) {
    game_setState(GAME_STATE_PAUSED);
  }
}

function userInputs_handleMouseDown() {
  if (gameState === GAME_STATE_TITLE) {
    game_setState(GAME_STATE_LEVEL_INTRO);
  }
  else if (gameState === GAME_STATE_LEVEL_INTRO) {
    if (terminalPrinting) {
      terminal_finishPrinting();
    }
    else {
      game_setState(GAME_STATE_PLAYING);
    }
    
  }
  else if (gameState === GAME_STATE_PLAYING) {
    // https://w3c.github.io/pointerlock/#dfn-engagement-gesture
    game_requestPointerLock()
  }
  else if (gameState === GAME_STATE_PAUSED) {
    if (terminalPrinting) {
      terminal_finishPrinting();
    }
    else {
      game_setState(GAME_STATE_PLAYING);
    }
  }
  else if (gameState === GAME_STATE_DIED) {
    if (terminalPrinting) {
      terminal_finishPrinting();
    }
    else {
      game_setState(GAME_STATE_LEVEL_INTRO);
    }
  }
  else if (gameState === GAME_STATE_WIN) {
    if (terminalPrinting) {
      terminal_finishPrinting();
    }
    else {
      game_setState(GAME_STATE_TITLE);
    }
  }
}