function nova_update() {
  if (gameState === GAME_STATE_PLAYING && playerEnteredLevel) {
    reactors.forEach(function(nova) {
      if (nova.timeToNextBurst === 0) {
        nova_addBurst(nova);
        soundEffects_play(SOUND_EFFECTS_NOVA_EXPLOSION);
        soundEffects_play(SOUND_EFFECTS_RUMBLE);
        novaRumbleLeft = NOVA_RUMBLE_DURATION;
        nova.timeToNextBurst = nova.burstDelay;
      }
      else {
        let lastTime = nova.timeToNextBurst;
        nova.timeToNextBurst -= elapsedTime/1000;
        if (nova.timeToNextBurst < 0) {
          nova.timeToNextBurst = 0;
        }
        else if (Math.ceil(lastTime) !== Math.ceil(nova.timeToNextBurst) && Math.ceil(nova.timeToNextBurst) <= 3) {
          soundEffects_play(SOUND_EFFECTS_NOVA_COUNTDOWN);
        }
      }
    });

    let newNovas = [];

    novas.forEach(function(nova) {
      if (nova.isCore) {
        newNovas.push(nova);
      }
      else {
        nova.radius += elapsedTime / 1000 * NOVA_EXPAND_SPEED;

        if (nova.radius < NOVA_MAX_RADIUS) {
          newNovas.push(nova);
        }
      }

      if (!nova.isPlayerIn && nova_isPlayerIn(nova)) {
        if (isPlayerSafe) {
          soundEffects_play(SOUND_EFFECTS_FIELD_PROTECT);
        }
        else {
          game_setState(GAME_STATE_DIED);
        }

        nova.isPlayerIn = true;
      }
      // if exiting nova
      else if (nova.isPlayerIn && !nova_isPlayerIn(nova)) {
        nova.isPlayerIn = false;
      }
    });

    // update novas with filtered out list
    novas = newNovas;

    // update rumble
    if (novaRumbleLeft > 0) {
      novaRumbleLeft -= elapsedTime;

      if (novaRumbleLeft < 0) {
        novaRumbleLeft = 0;
      }
    }
  }
}

function nova_addBurst(nova) {
  novas.push({
    x: nova.x, 
    y: nova.y,
    z: nova.z,
    radius: NOVA_START_RADIUS,
    isCore: nova.isCore
  });
  
}

function nova_isPlayerIn(nova) {
  const x = player.x;
  const y = player.y;
  const z = player.z;
  const cx = nova.x;
  const cy = nova.y;
  const cz = nova.z;
  const r = nova.radius;

  if (Math.pow(( x-cx ),2) + Math.pow((y-cy),2) + Math.pow((z-cz),2) < r*r) {
    return true;
  }
  else {
    return false;
  }
}


