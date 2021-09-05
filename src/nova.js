function nova_update() {
  if (gameState === GAME_STATE_PLAYING && playerEnteredLevel) {
    reactors.forEach(function(nova) {
      if (nova.timeToNextBurst === 0) {
        nova_addBurst(nova);
        soundEffects_play(SOUND_EFFECTS_NOVA_EXPLOSION);
        nova.timeToNextBurst = nova.burstDelay;
      }
      else {
        nova.timeToNextBurst -= elapsedTime/1000;
        if (nova.timeToNextBurst < 0) {
          nova.timeToNextBurst = 0;
        }
      }
    });

    novas.forEach(function(novaBurst) {
      novaBurst.radius += elapsedTime / 1000 * NOVA_EXPAND_SPEED;

      if (novaBurst.radius > NOVA_MAX_RADIUS) {
        console.log('clean up');
      }
    });
  }

  // if (gameState === GAME_STATE_PLAYING) {
  //   if (isNovaExploding) {
  //     novaRadius += elapsedTime / 1000 * NOVA_EXPAND_SPEED;

  //     if (novaRadius >= NOVA_MAX_RADIUS) {
  //       nova_reset(); 
  //     }
  //   }
  //   else if (novaCountingDown) {
  //     let lastElapsedTime = novaElapsedTime;
  //     novaElapsedTime += elapsedTime;

  //     if (novaElapsedTime/1000 >= novaCountdownTime) {  
  //       nova_explode();
  //     }
  //   }
  // }
}

function nova_addBurst(nova) {
  novas.push({
    x: nova.x, 
    y: nova.y,
    z: nova.z,
    radius: NOVA_START_RADIUS
  });
  
}



