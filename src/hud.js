function hud_init() {
  hudDirty = true;
}

function hud_render() {
  hudContext.clearRect(0, 0, viewportWidth, viewportHeight);

  hudContext.save();
  hudContext.scale(viewportScale, viewportScale);
  
  hudContext.restore();
}











