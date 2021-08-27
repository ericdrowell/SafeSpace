function hud_init() {
  hudDirty = true;
}

function hud_render() {
  hudContext.clearRect(0, 0, viewportWidth, viewportHeight);

  hudContext.save();
  hudContext.scale(viewportScale, viewportScale);

  hudContext.restore();
}

function hud_renderTitle() {
  const title = `
    OOOOOOOOOOOOOOOOOOOOOOOO
    O   OOO  OOO   OO   OOOO                                      
    O OOOO  O OO OOOO OOOOOO                                             
    O   OO    OO   OO   OOOO                                                             
    OOO OO  O OO OOOO OOOOOO                                           
    O   OO  O OO OOOO   OOOO                                                                                        
    OOOOOOOOOOOOOOOOOOOOOOOO                                                                                                  
  `;
}











