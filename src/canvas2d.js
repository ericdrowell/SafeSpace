function canvas2d_init() {
  hudCanvas = document.getElementById('hudCanvas');
  hudContext = canvas2d_initCanvas(hudCanvas, viewportWidth, viewportHeight, PIXEL_RATIO);

  // very wide screen
  if (windowRatio > GAME_ASPECT_RATIO) {
    hudCanvas.style.left = '50%';
    hudCanvas.style.marginLeft = '-' + (viewportWidth/2) + 'px';
    canvasLeft = -1 * (viewportWidth/2);
  }
  // very tall screen
  else {
    hudCanvas.style.top = '50%';
    hudCanvas.style.marginTop = '-' + (viewportHeight/2) + 'px';
    canvasLeft = 0;
  }

  spriteCanvas = document.createElement('canvas');
  spriteContext = canvas2d_initCanvas(spriteCanvas, OPTIMAL_VIEWPORT_WIDTH, OPTIMAL_VIEWPORT_HEIGHT, PIXEL_RATIO);
  spriteContext.webkitImageSmoothingEnabled = false;
  spriteContext.imageSmoothingEnabled = false;

  textureCanvas = document.createElement('canvas');
  textureCanvas.width = 16;
  textureCanvas.height = 16;
  textureContext = textureCanvas.getContext('2d');
};

function canvas2d_initCanvas(canvas, width, height, pixelRatio) {
  let context = canvas.getContext('2d');
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;



  if (pixelRatio !== 1) {
    context.scale(pixelRatio, pixelRatio);
  }

  return context;
}

function canvas2d_fillPattern(context, scale, pattern) {
    context.save();
    context.scale(2, 2);
    context.fillStyle = pattern;
    context.fill();
    context.restore();
}
