function hud_init() {

}

function hud_render() {
  hudContext.clearRect(0, 0, viewportWidth, viewportHeight);

  hudContext.save();
  hudContext.scale(viewportScale, viewportScale);

  

  if (gameState === GAME_STATE_TITLE) {
    hud_renderTitleScreen();
  }

  hudContext.restore();
}

function hud_renderTitle(x, y) {
  hudContext.textBaseline = 'middle';
  hudContext.font = '100 170px impact';
  hudContext.fillText('SAFE', x, y);

  hudContext.font = '100 120px impact';
  hudContext.fillText('SPACE', x, y + 130);

  // draw box top
  hudContext.lineWidth = 10;
  hudContext.beginPath();
  hudContext.moveTo(x -180, y); 
  hudContext.lineTo(x -180, y - 100); 
  hudContext.lineTo(x + 180, y - 100); 
  hudContext.lineTo(x + 180, y); 
  hudContext.stroke();
}

function hud_renderTitleScreen() {
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

  // highlighted text
  // hudContext.fillStyle = hudContext.strokeStyle = 'rgba(255, 255, 255, 0.2)'
  // hud_renderTitle(-2, -32);

  // shadowed text
  hudContext.fillStyle = hudContext.strokeStyle = 'rgba(0, 0, 0, 0.5)'
  hud_renderTitle(0, -20);

  // main textured text
  hudContext.save();
  // hudContext.shadowColor='#007eff';
  // hudContext.shadowBlur=20;
  // hudContext.lineWidth=5;
  let pattern = hudContext.createPattern(textures[TEXTURES_BLUE_PLATE].image, 'repeat');
  hudContext.fillStyle = hudContext.strokeStyle = pattern;
  hud_renderTitle(0, -30);
  hudContext.restore();

  hudContext.font = '100 23px verdana';
  hudContext.fillStyle = 'rgba(255, 255, 255, 0.5)';
  hudContext.fillText('@ericdrowell JS13K 2021', 0, 200);

  hudContext.restore();


}











