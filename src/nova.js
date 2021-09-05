function nova_update() {
  if (gameState === GAME_STATE_PLAYING) {
    if (isNovaExploding) {
      novaRadius += elapsedTime / 1000 * NOVA_EXPAND_SPEED;

      if (novaRadius >= NOVA_MAX_RADIUS) {
        nova_reset(); 
      }
    }
    else if (novaCountingDown) {
      let lastElapsedTime = novaElapsedTime;
      novaElapsedTime += elapsedTime;

      // if change
      if (Math.ceil(lastElapsedTime/1000) !== Math.ceil(novaElapsedTime/1000)) {
        nova_processInterval()
      }
    }
  }
}

function nova_explode() {
  novaElapsedTime = 0;
  novaCountingDown = false;
  isNovaExploding = true;
  soundEffects_play(SOUND_EFFECTS_NOVA_EXPLOSION);
  soundEffects_play(SOUND_EFFECTS_NOVA_RUMBLE); 
}

function nova_reset() {
  isNovaExploding = false;
  novaRadius = SPHERE_START_RADIUS;
  soundEffects_play(SOUND_EFFECTS_NOVA_RESET);
  music_start();
  nova_start();
}

function nova_processInterval() {
  console.log(Math.ceil(novaElapsedTime/1000));
  if (novaElapsedTime/1000 >= novaCountdownTime) {  
    nova_explode();
  }
  else if (novaElapsedTime/1000 >= novaCountdownTime - 3) {
    music_stop();
    soundEffects_play(SOUND_EFFECTS_NOVA_COUNTDOWN); 
  }
}

function nova_start() {
  novaElapsedTime = 0;
  novaCountingDown = true;
}

