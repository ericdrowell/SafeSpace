
// https://codepen.io/giana/pen/qmKNeE

function title_init() {
  titleEl = document.getElementById('title');

  // very wide screen
  if (windowRatio > GAME_ASPECT_RATIO) {
    titleEl.style.left = '50%';
    titleEl.style.marginLeft = '-' + (viewportWidth/2) + 'px';
    
  }
  // very tall screen
  else {
    titleEl.style.top = '50%';
    titleEl.style.marginTop = '-' + (viewportHeight/2) + 'px';
  }

  titleEl.style.width = viewportWidth + 'px';
  titleEl.style.height = viewportHeight + 'px';

  title_show();

  // setTimeout(function() {
  //   title_animate();
  // }, 0);
  
}

function title_show() {
  titleEl.style.display = 'flex';
}

// function title_animate() {
//   titleTextEl.style.letterSpacing = '3vw';
//   titleTextEl.style.color = 'rgba(255, 255, 255, 0.5)';
//   //titleTextEl.style.textShadow = '0 0 50px rgba(255, 255, 255, 0.7)';
// }

function title_hide() {
  titleEl.style.display = 'none';
}