function nova_update() {
  if (nova_isExploding) {
    sphereRadii += elapsedTime / 1000 * NOVA_EXPAND_SPEED;

    if (sphereRadii >= NOVA_MAX_RADIUS) {
      nova_reset();
      
    }
  }
}

function nova_explode() {
  nova_isExploding = true;
  soundEffects_play(SOUND_EFFECTS_NOVA_EXPLOSION);
  soundEffects_play(SOUND_EFFECTS_NOVA_RUMBLE); 
}

function nova_reset() {
  nova_isExploding = false;
  sphereRadii = SPHERE_START_RADIUS;
  soundEffects_play(SOUND_EFFECTS_NOVA_RESET);
  music_play();
}

function nova_start() {
  music_stop();
  soundEffects_play(SOUND_EFFECTS_NOVA_COUNTDOWN);
  let alarms = 1;
  let interval = setInterval(function() {
    if (alarms < 3) {
      soundEffects_play(SOUND_EFFECTS_NOVA_COUNTDOWN);
      alarms++;
    }
    else {
      clearInterval(interval);
      nova_explode();
      
    }
  }, 2000);
}

