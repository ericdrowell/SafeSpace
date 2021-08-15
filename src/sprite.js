function sprite_init(callback) {
  let image = new Image();
  image.onload = function() {
    spriteContext.save();
    spriteContext.translate(0, 270);
    spriteContext.scale(15, 15); // height goes from 5 -> 75
    spriteContext.drawImage(image, 0, 0);
    spriteContext.restore();
    callback();
  };

  image.src = 'alphabet-tiny.gif'; 
}

function sprite_draw(context, x, y, width, height) {
  context.drawImage(spriteCanvas, x* PIXEL_RATIO+1, y* PIXEL_RATIO, width* PIXEL_RATIO-2, height* PIXEL_RATIO, 0, 0, width, height);
}