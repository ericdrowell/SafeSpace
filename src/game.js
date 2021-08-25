let ENABLE_MONSTERS = true;

// start game - have to do it this way because I need the compressor to convert game_init() to the right variable name
setTimeout(function() {
  game_init();
}, 50);

function game_init() {
  game_setViewportSize();

  let html = document.querySelector('html');
  html.style.height = '100%';

  let body = document.querySelector('body');
  body.style.overflow = 'hidden';
  body.style.padding = 0;
  body.style.margin = 0;
  body.style.backgroundColor = 'black';
  body.style.height = '100%';

  canvas2d_init()
  webgl_init();
  hud_init();
  userInputs_init();

  level_init();
  player_init();
  music_init(SONG);

  textures_init(function() {
    texturesReady = true;
    sprite_init(function() {
      hudDirty = true;
      spritesReady = true;
      game_setReady();
    });
  });

  game_setState(GAME_STATE_TITLE);

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
  // TODO: should use dirty flag instead of looking at state
  if (gameState === GAME_STATE_PLAYING) {
    webgl_render(); 
  }

  if (hudDirty && texturesReady) {
    hud_render();
    hudDirty = false;
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

function game_setState(state) {
  let prevState = gameState;
  let nextState = state;

  //console.log(prevState + '->' + nextState);

  // if state changing to self, kickout
  if (prevState === nextState) {
    return false;
  }

  gameState = nextState;

  // state transition scenarios
  // level title -> intro
  if (prevState === GAME_STATE_TITLE) {
    music_play();
  }
  // level intro -> playing
  else if (prevState === GAME_STATE_LEVEL_INTRO) {
    game_requestPointerLock()
    soundEffects_play(SOUND_EFFECTS_START);
  }
  // playing -> paused
  else if (nextState === GAME_STATE_PAUSED) {
    music_stop();
    game_exitPointerLock();
    soundEffects_play(SOUND_EFFECTS_DIALOG);
  }
  // paused -> playing
  else if (prevState === GAME_STATE_PAUSED) {
    music_play();

    player.sideMovement = 0;
    player.straightMovement = 0;
    player.sideMovement = 0;
    player.straightMovement = 0;

    game_requestPointerLock()
    soundEffects_play(SOUND_EFFECTS_DIALOG);
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
