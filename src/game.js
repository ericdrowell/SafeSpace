let ENABLE_MONSTERS = true;

// start game - have to do it this way because I need the compressor to convert game_init() to the right variable name
setTimeout(function() {
  game_init();
}, 50);

function game_init() {
  game_setState(GAME_STATE_TITLE);

  game_setViewportSize();
  canvas2d_init()
  webgl_init();
  hud_init();
  userInputs_init();
  player_init();
  level_init();
  music_init();
  terminal_init();

  textures_init(function() {
    texturesReady = true;
    sprite_init(function() {
      hudDirty = true;
      spritesReady = true;
      game_setReady();
    });
  });

  

  game_loop();
}

function game_restart() {
  player_init();
  gameState = GAME_STATE_PLAYING;
}

function game_setViewportSize() {
  let windowWidth =  window.innerWidth;
  let windowHeight = window.innerHeight;

  windowRatio = windowWidth / windowHeight;
  

  if (windowRatio > GAME_ASPECT_RATIO) {
    viewportHeight = windowHeight;
    viewportWidth = windowHeight * GAME_ASPECT_RATIO;
  }
  else {
    viewportWidth = windowWidth;
    viewportHeight = windowWidth / GAME_ASPECT_RATIO;
  }

  viewportScale = viewportWidth / OPTIMAL_VIEWPORT_WIDTH;
}

function game_setReady() {

  if (spritesReady) {
    hudDirty = true;
  }
}

function game_render() {
  if (texturesReady) {
    // TODO: should use dirty flag instead of looking at state
    if (gameState === GAME_STATE_PLAYING || gameState === GAME_STATE_TITLE) {
      webgl_render(); 
    }

    if (hudDirty) {
      hud_render();
      hudDirty = false;
    }
  }
};

function game_requestPointerLock() {
  if (!game_isPointerLocked()) {
    hudCanvas.requestPointerLock();
  }
}

function game_exitPointerLock() {
  document.exitPointerLock();
}

function game_isPointerLocked() {
  return document.pointerLockElement === hudCanvas;
}

function game_setState(nextState) {
  let prevState = gameState;

  //console.log(prevState + '->' + nextState);

  // if state changing to self, kickout
  if (prevState === nextState) {
    return false;
  }

  gameState = nextState;

  // state transition scenarios
  // title -> level intro
  if (nextState === GAME_STATE_LEVEL_INTRO) {
    music_stop();
    music_play();
    terminal_show();
    soundEffects_play(SOUND_EFFECTS_DIALOG);
    soundEffects_play(SOUND_EFFECTS_TERMINAL);
  }
  // level intro -> playing
  else if (prevState === GAME_STATE_LEVEL_INTRO) {
    level_init();
    webgl_show();
    terminal_hide();
    game_requestPointerLock();
    soundEffects_play(SOUND_EFFECTS_START);

  }
  // playing -> paused
  else if (nextState === GAME_STATE_PAUSED) {
    terminal_show();
    webgl_hide();
    music_stop();
    game_exitPointerLock();
    soundEffects_play(SOUND_EFFECTS_DIALOG);
    soundEffects_play(SOUND_EFFECTS_TERMINAL);
  }
  // paused -> playing
  else if (prevState === GAME_STATE_PAUSED) {
    music_play();
    terminal_hide();
    webgl_show();

    player.sideMovement = 0;
    player.straightMovement = 0;
    player.sideMovement = 0;
    player.straightMovement = 0;

    game_requestPointerLock()
    soundEffects_play(SOUND_EFFECTS_DIALOG);
  }
  // playing -> died
  else if (nextState === GAME_STATE_DIED) {
    terminal_show();
    webgl_hide();
    music_stop();
    game_exitPointerLock();
    soundEffects_play(SOUND_EFFECTS_DIED);
  }

  
}

function game_update() {  
  if (gameState === GAME_STATE_PLAYING) {
    player_update();
    nova_update();
  }
}

function game_loop() {
  now = new Date().getTime();

  if (startTime === 0) {
    startTime = now;
  }

  if (lastTime !== 0) {
    elapsedTime = now - lastTime;
  }
  
  totalElapsedTime = now - startTime;

  game_update();
  game_render();

  lastTime = now;
  window.requestAnimationFrame(game_loop);  
}
