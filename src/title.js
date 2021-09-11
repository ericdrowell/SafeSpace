function title_update() {
  if (gameState === GAME_STATE_TITLE) {
    titleStartLeft -= elapsedTime;

    if (titleStartLeft <= 0) {
      titleStartLeft = TITLE_START_DURATION;
    }
  }
}

function title_init() {
  titleStartLeft = TITLE_START_DURATION;
}

function title_render() {
  hudContext.clearRect(0, 0, viewportWidth, viewportHeight);

  hudContext.save();
  hudContext.scale(viewportScale, viewportScale);




  hudContext.save();

  let gradient = hudContext.createRadialGradient(OPTIMAL_VIEWPORT_WIDTH/2,-700,0, OPTIMAL_VIEWPORT_WIDTH/2, -700, 1000);

  // Add three color stops
  gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
  gradient.addColorStop(.9, 'rgba(255, 0, 0, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0.1)');

  hudContext.fillStyle = gradient;
  hudContext.fillRect(0, 0, OPTIMAL_VIEWPORT_WIDTH, OPTIMAL_VIEWPORT_HEIGHT);



  hudContext.translate(OPTIMAL_VIEWPORT_WIDTH/2, OPTIMAL_VIEWPORT_HEIGHT/2);
  
  hudContext.textAlign = 'center';

  hudContext.fillStyle = hudContext.strokeStyle = 'rgba(133, 172, 210, .6)';
  hudContext.save();
  hudContext.translate(0, 6);
  hudContext.scale(1.3, 1.3);
  hudContext.textBaseline = 'middle';
  hudContext.font = '100 140px impact';
  hudContext.fillText('SAFE', 0, 0);

  hudContext.font = '100 100px impact';
  hudContext.fillText('SPACE', 0, 0 + 100);
  hudContext.restore();


  hudContext.fillStyle = '#482422';
  hudContext.fillRect(-150, 291, 300, 22);


  hudContext.font = '100 23px verdana';

  hudContext.fillStyle = '#280f14';
  hudContext.fillText('@ericdrowell JS13K 2021', 1, 312);

  hudContext.fillStyle = '#523c3b';
  hudContext.fillText('@ericdrowell JS13K 2021', -1, 310);

  if (titleStartLeft < TITLE_START_OFF_TIME) {
    hudContext.save();
    hudContext.font = '100 38px monospace';
    hudContext.scale(1, 1);
    hudContext.fillStyle = 'white';
    hudContext.globalAlpha = 0.7;
    hudContext.fillText('CLICK TO START', 0, 240);
    hudContext.restore();
  }

  hudContext.restore();




  hudContext.restore();
}

