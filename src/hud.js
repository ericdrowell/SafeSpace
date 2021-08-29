function hud_init() {

}

function hud_render() {
  hudContext.save();
  hudContext.scale(viewportScale, viewportScale);

  hud_renderTitle();

  hudContext.restore();
}

function hud_renderTitle() {
  hudContext.save();
  hudContext.translate(OPTIMAL_VIEWPORT_WIDTH/2, OPTIMAL_VIEWPORT_HEIGHT/2);
  

  hudContext.fillStyle = '#007eff';
  hudContext.textBaseline = 'middle';
  hudContext.font = '100 170px impact';
  hudContext.textAlign = 'center';
  hudContext.fillText('SAFE', 0, -30);
  hudContext.font = '100 120px impact';
  hudContext.fillStyle = '#007eff';
  hudContext.fillText('SPACE', 0, 90);

  // draw box top
  hudContext.strokeStyle = '#007eff';
  hudContext.lineWidth = 10;
  hudContext.beginPath();
  hudContext.moveTo(-180, -30); 
  hudContext.lineTo(-180, -130); 
  hudContext.lineTo(180, -130); 
  hudContext.lineTo(180, -30); 
  hudContext.stroke();

  hudContext.restore();


}











