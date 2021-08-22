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

  world_init();
  player_init();

  gameState = GAME_STATE_INTRO;

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
  // TODO: should use dirty flag instead of looking at state
  if (gameState === GAME_STATE_PLAYING || (!firstRender && texturesReady)) {
    let viewAngle = 45; // 45 -> 90
    let minDist = 0.1;
    let maxDist = 150; // 100
    mat4.perspective(viewAngle, sceneCanvas.width / sceneCanvas.height, minDist, maxDist, pMatrix);
    mat4.identity(mvMatrix);

    webgl_clear(sceneCanvas, sceneContext);


    mat4.rotate(mvMatrix, -player.pitch, [1, 0, 0]);
    mat4.rotate(mvMatrix, -player.yaw, [0, 1, 0]);
    mat4.translate(mvMatrix, [-2 * player.x, -2 * (player.y + PLAYER_HEIGHT), -2 * player.z]);
    mat4.translate(mvMatrix, [0, bobble, 0]);

    world_render();

    firstRender = true;
    
  }

  if (hudDirty && texturesReady) {
    hud_render();
    hudDirty = false;
  }
};

function game_start() {
  hudDirty = true;
  gameState = GAME_STATE_PLAYING;
  soundEffects_play(SOUND_EFFECTS_START);
  hudCanvas.requestPointerLock();
}

function game_pause() {
  hudDirty = true;
  gameState = GAME_STATE_PAUSED;
  soundEffects_play(SOUND_EFFECTS_DIALOG);
  document.exitPointerLock();
}

function game_resume() {
  hudDirty = true;
  gameState = GAME_STATE_PLAYING;
  hudCanvas.requestPointerLock();
  soundEffects_play(SOUND_EFFECTS_DIALOG);
}

function game_win() {
  hudDirty = true;
  setTimeout(function() {
    hudDirty = true;
    document.exitPointerLock();
    gameState = GAME_STATE_WIN;
    clickBlock = 500;
  }, 1000);

}

function game_die() {
  hudDirty = true;
  document.exitPointerLock();
  gameState = GAME_STATE_DIED;
  clickBlock = 500;
}

function game_update() {
  // handle click block
  // TODO: should move this to hud
  if (clickBlock > 0) {
    clickBlock -= elapsedTime;
    if (clickBlock <= 0) {
      clickBlock = 0;
      hudDirty = true;
    }
  }
  
  if (gameState === GAME_STATE_PLAYING) {
    if (player.health <= 0) {
      game_die();
    }
    
    player_update();
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
