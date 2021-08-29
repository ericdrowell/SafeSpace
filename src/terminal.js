// https://css-tricks.com/old-timey-terminal-styling/

const terminal_messages = [
  "LOADING LEVEL 1...",
  "Dr. Heisenberg, there's no time to explain.  You must leave the lab at once.  The fusion reactors are melting down.  I've created a SAFE SPACE that protects you from radioactive bursts.  I'll tell you more once you reach the infirmary.",
  "[WASD] _Run#__[Mouse] Look#__[Space] Jump#__[Esc] __Pause",
  "CLICK TO START",
];

function terminal_init() {
  terminalEl = document.getElementById('terminal');
  terminalTextEl = document.getElementById('terminalText');

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

function terminal_printChar(text) {
  if (text === '#') {
    text = '<br>'
  }
  else if (text === '_') {
    text = '&nbsp;';
  }

  terminalTextEl.innerHTML += text;

  if (gameState === GAME_STATE_LEVEL_INTRO) {
    soundEffects_play(SOUND_EFFECTS_TERMINAL_BLIP);
  }
}

function terminal_newLine() {
  if (terminalTextEl.innerHTML === '') {
    terminalTextEl.innerHTML = '> ';
  }
  else {
    terminalTextEl.innerHTML += '<br><br>> ';
  }

  if (gameState === GAME_STATE_LEVEL_INTRO) {
    soundEffects_play(SOUND_EFFECTS_TERMINAL);
  }
  
}

function terminal_processTextArr(arr, callback) {
  if (arr.length <= 0) {
    callback();
  }
  else {
    terminal_printChar(arr.shift());
    setTimeout(function() {
      terminal_processTextArr(arr, callback)
    }, TERMINAL_PRINT_CHAR_DELAY);
  }
}

function terminal_printLine(text, callback) {
  let arr = text.split('');

  terminal_newLine();
  terminal_processTextArr(arr, callback);
}

function terminal_printMessages(start, end) {
  let message = terminal_messages[start];
  terminal_printLine(message, function() {
    if (start < end) {
      setTimeout(function() {
        terminal_printMessages(start+1, end);
      }, TERMINAL_PRINT_DELAY);
    }
  });
}