function canvas2d_init() {
  hudCanvas = document.getElementById('hudCanvas');
  hudContext = canvas2d_initCanvas(hudCanvas, viewportWidth, viewportHeight, PIXEL_RATIO);

  // very wide screen
  if (windowRatio > GAME_ASPECT_RATIO) {
    hudCanvas.style.left = '50%';
    hudCanvas.style.marginLeft = '-' + (viewportWidth/2) + 'px';
  }
  // very tall screen
  else {
    hudCanvas.style.top = '50%';
    hudCanvas.style.marginTop = '-' + (viewportHeight/2) + 'px';
  }

  textureCanvas = document.createElement('canvas');
  textureCanvas.width = 32;
  textureCanvas.height = 32;
  textureContext = textureCanvas.getContext('2d');
  // HACK: flip context y because cube geometries have it upside down
  textureContext.transform(1, 0, 0, -1, 0, textureCanvas.height)
};

function canvas2d_show() {
  hudCanvas.style.opacity = 1;
}

function canvas2d_hide() {
  hudCanvas.style.opacity = 0;
}

function canvas2d_initCanvas(canvas, width, height) {
  let context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;

  return context;
}

// function canvas2d_copyWebgl() {
//   //hudContext.clearRect(0, 0, viewportWidth, viewportHeight);
//   hudContext.fillStyle = 'black';
//   hudContext.fillRect(0, 0, viewportWidth, viewportHeight);
//   hudContext.drawImage(sceneCanvas, 0, 0);
// }
  

// function canvas2d_pixelate() {
//   let size = 3 * viewportScale,
//   w = Math.floor(sceneCanvas.width / size),
//   h = Math.ceil(sceneCanvas.height / size);

//   // draw the original image at a fraction of the final size
//   hudContext.drawImage(hudCanvas, 0, 0, w, h);

//   // turn off image aliasing
//   hudContext.imageSmoothingEnabled = false;

//   // enlarge the minimized image to full size    
//   hudContext.drawImage(hudCanvas, 0, 0, w, h, 0, 0, hudCanvas.width, hudCanvas.height);
  
// }



