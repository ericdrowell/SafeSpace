let ENABLE_MONSTERS = true;

// start game - have to do it this way because I need the compressor to convert game_init() to the right variable name
setTimeout(function() {
  game_init();
}, 50);

function game_init() {
  game_setViewportSize();
  canvas2d_init()
  webgl_init();

  game_setState(GAME_STATE_TITLE);

  hud_init();
  userInputs_init();  
  door_init();
  // NOTE: have to init level to init title screen (rendered as a level)
  level_init();
  music_init();
  terminal_init();

  textures_init(function() {
    texturesReady = true;
  });

  

  game_loop();
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

function game_render() {
  if (texturesReady) {
    // TODO: should use dirty flag instead of looking at state
    if (gameState === GAME_STATE_PLAYING || gameState === GAME_STATE_TITLE) {
      webgl_render(); 
      hud_render();
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

  if (nextState === GAME_STATE_TITLE) {

  }
  // title -> level intro
  else if (nextState === GAME_STATE_LEVEL_INTRO) {
    level_init();
    music_start();
    canvas2d_hide();
    terminal_show();
    terminal_printMessages(7, 10);
    soundEffects_play(SOUND_EFFECTS_DIALOG);
  }
  // level intro -> playing
  else if (prevState === GAME_STATE_LEVEL_INTRO) {
    terminal_hide();
    canvas2d_show();
    game_requestPointerLock();
    soundEffects_play(SOUND_EFFECTS_START);
  }
  // playing -> paused
  else if (nextState === GAME_STATE_PAUSED) {
    canvas2d_hide();
    terminal_show();
    terminal_printMessages(0, 2);
    music_stop();
    game_exitPointerLock();
    soundEffects_play(SOUND_EFFECTS_DIALOG);
  }
  // paused -> playing
  else if (prevState === GAME_STATE_PAUSED) {
    music_start();
    terminal_hide();
    canvas2d_show();

    player.sideMovement = 0;
    player.straightMovement = 0;
    player.sideMovement = 0;
    player.straightMovement = 0;

    game_requestPointerLock()
    soundEffects_play(SOUND_EFFECTS_DIALOG);
  }
  // playing -> died
  else if (nextState === GAME_STATE_DIED) {
    canvas2d_hide();
    terminal_show();
    terminal_printMessages(3, 4);
    music_stop();
    game_exitPointerLock();
    soundEffects_play(SOUND_EFFECTS_DIED);
  }

  
}

function game_update() {  
  if (gameState === GAME_STATE_PLAYING) {
    player_update();
    nova_update();
    door_update();
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
