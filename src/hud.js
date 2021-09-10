function hud_render() {
  hudContext.clearRect(0, 0, viewportWidth, viewportHeight);

  hudContext.save();
  hudContext.scale(viewportScale, viewportScale);



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



  hudContext.restore();
}













