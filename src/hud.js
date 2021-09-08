
function hud_render() {
  hudContext.clearRect(0, 0, viewportWidth, viewportHeight);

  hudContext.save();
  hudContext.scale(viewportScale, viewportScale);

  if (gameState === GAME_STATE_TITLE) {
    hud_renderTitleScreen();
  }
  else if (gameState === GAME_STATE_PLAYING) {
    hud_renderMain();
  }

  hudContext.restore();
}

function hud_renderTitle() {
  hudContext.save();
  hudContext.translate(0, 6);
  hudContext.scale(1, 1.25);
  hudContext.textBaseline = 'middle';
  hudContext.font = '100 140px impact';
  hudContext.fillText('SAFE', 0, 0);

  hudContext.font = '100 100px impact';
  hudContext.fillText('SPACE', 0, 0 + 100);
  hudContext.restore();
}

function hud_renderTitleScreen() {
  let gradient, pattern;

  hudContext.save();

  gradient = hudContext.createRadialGradient(OPTIMAL_VIEWPORT_WIDTH/2,-700,0, OPTIMAL_VIEWPORT_WIDTH/2, -700, 1000);

  // Add three color stops
  gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
  gradient.addColorStop(.9, 'rgba(255, 0, 0, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0.1)');

  hudContext.fillStyle = gradient;
  hudContext.fillRect(0, 0, OPTIMAL_VIEWPORT_WIDTH, OPTIMAL_VIEWPORT_HEIGHT);



  hudContext.translate(OPTIMAL_VIEWPORT_WIDTH/2, OPTIMAL_VIEWPORT_HEIGHT/2);
  
  hudContext.textAlign = 'center';

  hudContext.fillStyle = hudContext.strokeStyle = 'rgba(133, 172, 210, .6)';
  hud_renderTitle();

  hudContext.font = '100 23px verdana';

  hudContext.fillStyle = '#34161a';
  hudContext.fillText('@ericdrowell JS13K 2021', 1, 310);

  hudContext.fillStyle = '#523c3b';
  hudContext.fillText('@ericdrowell JS13K 2021', -1, 308);



  hudContext.restore();


}

function hud_renderMain() {
  hudContext.save();

  hudContext.translate(OPTIMAL_VIEWPORT_WIDTH/2, OPTIMAL_VIEWPORT_HEIGHT/2);

  // center rings
  hudContext.lineWidth = 2;
  hudContext.strokeStyle = 'rgba(106, 187, 109, 0.2)';
  hudContext.beginPath();
  
  hudContext.arc(0, 0, 20, 0, Math.PI*2);
  hudContext.stroke();

  hudContext.beginPath();
  hudContext.arc(0, 0, 30, 0, Math.PI*2);
  hudContext.stroke();

  // peripheral
  const border = 20;
  const halfWidth = OPTIMAL_VIEWPORT_WIDTH/2-border;
  const halfHeight = OPTIMAL_VIEWPORT_HEIGHT/2-border;
  hudContext.beginPath();
  hudContext.moveTo(halfWidth, 0);
  hudContext.quadraticCurveTo(halfWidth, halfHeight, 0, halfHeight);
  hudContext.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, 0);
  hudContext.quadraticCurveTo(-halfWidth, -halfHeight, 0, -halfHeight);
  hudContext.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, 0);
  hudContext.stroke();

  hudContext.restore();
}











