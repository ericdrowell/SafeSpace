// https://css-tricks.com/old-timey-terminal-styling/

function terminal_init() {
  terminalEl = document.getElementById('terminal');

  // very wide screen
  if (windowRatio > GAME_ASPECT_RATIO) {
    terminalEl.style.left = '50%';
    terminalEl.style.marginLeft = '-' + (viewportWidth/2) + 'px';
    
  }
  // very tall screen
  else {
    terminalEl.style.top = '50%';
    terminalEl.style.marginTop = '-' + (viewportHeight/2) + 'px';
  }

  terminalEl.style.width = viewportWidth + 'px';
  terminalEl.style.height = viewportHeight + 'px';
}

function terminal_show() {
  terminalEl.style.display = 'block';
}

function terminal_hide() {
  terminalEl.style.display = 'none';
}