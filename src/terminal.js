// https://css-tricks.com/old-timey-terminal-styling/

const terminal_messages = [
  /* 0 */"PAUSED", 
  /* 1 */"Controls:#[WASD] _Run#[Mouse] Look#[Space] Jump & Double Jump#[Esc] __Pause",
  /* 2 */"CLICK TO CONTINUE", 
  /* 3 */"YOU DIED...", 
  /* 4 */"CLICK TO PLAY AGAIN", 
  /* 5 */"YOU WON!",
  /* 6 */"CLICK TO PLAY AGAIN", 
  /* 7 */"LEVEL 1",
  /* 8 */"Dr. Heisenberg, there's no time to explain.  You must leave the ship at once.  The fusion reactors are melting down and we've lost power.  I've created a SAFE SPACE that protects you from radioactive bursts.  Enter it, wait for the burst to pass, and then make your way to the INFIRMARY.  HURRY!!", // 8
  /* 9 */"Controls:#[WASD] _Run#[Mouse] Look#[Space] Jump#[Esc] __Pause",
  /* 10 */"CLICK TO START",
  /* 11 */"LEVEL 2",
  /* 12 */"The radioactive levels in the INFIRMARY have are at lethal levels.  I've sealed the doors.  We've got to get you out another way IMMEDIATELY.",
  /* 13 */"As fast as you can, make your way to the ENGINE ROOM before the hydraulics bridge collapses.  The lower deck is rapidly filling up with rocket fuel.  Avoid at all costs.  GO NOW!!",
  /* 14 */"CLICK TO START",
  /* 15 */"LEVEL 3",
  /* 16 */"Dr. Heisenberg, you're almost there.  The ship is moments away from exploding.  Make your way to Bay 13, I have an escape pod waiting for you.  HURRY!",
  /* 17 */"CLICK TO START",
];

const terminal_levelToRange = {
  1: [7, 10],
  2: [11, 14],
  3: [15, 17]
};

function terminal_getRangeFromLevel() {
  return terminal_levelToRange[level];
}

function terminal_init() {
  let cursorEl = document.getElementById('cursor');
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

  terminalEl.style.fontSize = Math.round(viewportHeight * .02) + 'px';
  cursorEl.style.height = Math.round(viewportHeight * .02) + 'px';
  cursorEl.style.width = Math.round(viewportHeight * .015) + 'px';
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


  
  
}

function terminal_newLine() {
  if (terminalTextEl.innerHTML === '') {
    terminalTextEl.innerHTML = '> ';
  }
  else {
    terminalTextEl.innerHTML += '<br><br>> ';
  }

  
}

function terminal_processTextArr(arr, isFast, callback) {
  if (arr.length <= 0) {
    callback();
  }
  else {
    terminal_printChar(arr.shift());
    if (isFast) {
      terminal_processTextArr(arr, isFast, callback)
    }
    else {
      soundEffects_play(SOUND_EFFECTS_TERMINAL_BLIP);
      terminalCharTimeout = setTimeout(function() {
        terminal_processTextArr(arr, isFast, callback)
      }, TERMINAL_PRINT_CHAR_DELAY);
    }
  }
}

function terminal_printLine(text, isFast, callback) {
  let arr = text.split('');

  terminal_newLine();
  terminal_processTextArr(arr, isFast, callback);
}

function terminal_clearTimeouts() {
  if (terminalMessageTimeout) {
    clearTimeout(terminalMessageTimeout);
  }
  if (terminalCharTimeout) {
    clearTimeout(terminalCharTimeout);
  }
}

function terminal_printMessages(start, end, isFast) {
  terminalRange = [start, end];
  terminalPrinting = true;

  terminal_clearTimeouts();

  terminalTextEl.innerHTML = '';
  _terminal_printMessages(start, end, isFast);
}

function _terminal_printMessages(start, end, isFast) {
  let message = terminal_messages[start];

  terminal_printLine(message, isFast, function() {
    if (start < end) {
      if (isFast) {
        _terminal_printMessages(start+1, end, isFast);
      }
      else {
        terminalMessageTimeout = setTimeout(function() {
          _terminal_printMessages(start+1, end, isFast);
        }, TERMINAL_PRINT_DELAY);
      }
    }
    else {
      terminalPrinting = false;
      soundEffects_play(SOUND_EFFECTS_TERMINAL_END);
    }
  });

}

function terminal_finishPrinting() {
  terminal_clearTimeouts()
  terminal_printMessages(terminalRange[0], terminalRange[1], true);
  terminalPrinting = false;
}