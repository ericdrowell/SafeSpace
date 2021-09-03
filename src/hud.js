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
  // hudContext.lineWidth = 10;
  // hudContext.beginPath();
  // hudContext.moveTo(x -180, y); 
  // hudContext.lineTo(x -180, y - 100); 
  // hudContext.lineTo(x + 180, y - 100); 
  // hudContext.lineTo(x + 180, y); 
  // hudContext.stroke();
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

  
  // pattern = hudContext.createPattern(textures[TEXTURES_METAL_PLATE_WITH_BOLTS].image, 'repeat');
  // hudContext.fillStyle = pattern;
  // hudContext.fillRect(-180, -130, 360, 300);

  // highlighted text
  // hudContext.fillStyle = hudContext.strokeStyle = 'rgba(255, 255, 255, 0.2)'
  // hud_renderTitle(-2, -32);

  // shadowed text
  // hudContext.fillStyle = hudContext.strokeStyle = 'rgba(0, 0, 0, 0.7)'
  // hud_renderTitle(0, -20);

  // main textured text
  // hudContext.save();
  // hudContext.shadowColor='red';
  // hudContext.shadowBlur=20;
  // hudContext.lineWidth=5;
  // hudContext.fillStyle = 'transparent';
  // hud_renderTitle(0, 30);
  // hudContext.restore();
  //pattern = hudContext.createPattern(textures[TEXTURES_BLUE_PLATE].image, 'repeat');


  // gradient = hudContext.createLinearGradient(0, -150, 0, 200);

  // // Add three color stops
  // gradient.addColorStop(0, '#d41a1c');
  // gradient.addColorStop(.5, '#0080cd');
  // // gradient.addColorStop(.6, '#d41a1c');
  // // gradient.addColorStop(.9, '#0080cd');
  // gradient.addColorStop(1, '#0080cd');

  // hudContext.fillStyle = gradient;


  // hudContext.fillStyle = hudContext.strokeStyle = 'rgba(255, 255, 255, 1)';
  // hud_renderTitle(-4, 26);

  hudContext.fillStyle = hudContext.strokeStyle = 'rgba(89, 143, 196, .6)';
  hud_renderTitle(0, 30);
  //hudContext.restore();

  hudContext.font = '100 23px verdana';

  hudContext.fillStyle = '#2d0f0b';
  hudContext.fillText('@ericdrowell JS13K 2021', 1, 303);

  hudContext.fillStyle = '#543125';
  hudContext.fillText('@ericdrowell JS13K 2021', -1, 301);



  hudContext.restore();


}











