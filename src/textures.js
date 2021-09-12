const TEXTURES_INVISIBLE    = -1;
const TEXTURES_METAL_GRATES = 0;
const TEXTURES_BLUE_PIPE = 1;
const TEXTURES_METAL_RIDGES = 2;
const TEXTURES_RUST = 3;
const TEXTURES_METAL_DUCT = 4;
const TEXTURES_CAUTION_STRIPES = 5;
const TEXTURES_CAUTION_STRIPES_ALT = 6;
const TEXTURES_LIGHT_BARS = 7;
const TEXTURES_FIB_METAL = 8;
const TEXTURES_WALL = 9;
const TEXTURES_NINE_BOLT_METAL = 10;
const TEXTURES_GREEN_METAL = 11;
const TEXTURES_RED_PIPE = 12;

function textures_init(callback) {
  // -------------------------------------------------------------------
  textures[TEXTURES_WALL] = (function() {
    textures_drawGrunge('#161616');
    //textures_drawBorder('rgba(0, 0, 0, 0.3)', 0);

    // textures_addDepth(function(level) {
    //   let color = level === 0 ? 'rgba(0, 0, 0, 0.3)': 'rgba(255, 255, 255, 0.05)'
    //   textures_drawBorder(color, 3);
    // });

    textures_drawTopLeftBorder('rgba(255, 255, 255, 0.05)');
    textures_drawBottomRightBorder('rgba(0, 0, 0, 0.3)');

    
    for (let y=0; y<4; y++) {
      textures_drawBolt(5, 5+y*8);
      textures_drawBolt(28, 5+y*8);
    }
    


    return textureCanvas.toDataURL();
  })();
  // -------------------------------------------------------------------
  textures[TEXTURES_METAL_GRATES] = (function() {
    textures_drawGrunge('#161616');
    
    textureContext.lineWidth = 4;
    textureContext.lineCap = 'round';
  
    textures_addDepth(function(level) {
      let color = level === 0 ? 'rgba(255, 255, 255, 0.05)': 'rgba(0, 0, 0, 0.9)';

      textureContext.strokeStyle = color;
      textureContext.beginPath();
      textureContext.moveTo(8, 16);
      textureContext.lineTo(8, 28);
      textureContext.stroke();
    

      textureContext.beginPath();
      textureContext.moveTo(24, 4);
      textureContext.lineTo(24, 16); 
      textureContext.stroke();
    });

    
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_METAL_RIDGES] = (function() {
    textures_drawGrunge('#080808');

    for (let n=0; n<5; n++) {
      // highlight
      textureContext.fillStyle = 'rgba(255, 255, 255, 0.07)';
      textureContext.fillRect(5 + n*5, 2, 1, 27);
    
      // shadow
      textureContext.fillStyle = 'rgba(0, 0, 0, 0.2)';
      textureContext.fillRect(5 + n*5+1, 3, 1, 27);
    }

    //textures_drawBolts();

    // textures_drawTopLeftBorder('rgba(255, 255, 255, 0.05)');
    // textures_drawBottomRightBorder('rgba(0, 0, 0, 0.3)');
  
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_RED_PIPE] = (function() {
    textures_drawGrunge('#2d0304');
    textures_drawPipeRidges();
    return textureCanvas.toDataURL();
  })();


  // -------------------------------------------------------------------
  textures[TEXTURES_BLUE_PIPE] = (function() {
    textures_drawGrunge('#03082d');
    textures_drawPipeRidges();
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_RUST] = (function() {
    textures_drawGrunge('#251808');
    textures_drawTopLeftBorder('rgba(255, 255, 255, 0.1)');
    textures_drawBottomRightBorder('rgba(0, 0, 0, 0.5)');

    textures_drawBoltTexture();
  
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_GREEN_METAL] = (function() {
    textures_drawGrunge('#0c0c01');
    textures_drawTopLeftBorder('rgba(255, 255, 255, 0.1)');
    textures_drawBottomRightBorder('rgba(0, 0, 0, 0.5)');

    textures_drawBolts();
  
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_METAL_DUCT] = (function() {
    textures_drawGrunge('#393939');
    textures_drawTopLeftBorder('rgba(255, 255, 255, 0.1)');
    textures_drawBottomRightBorder('rgba(0, 0, 0, 0.5)');

    textures_drawBolts();
  
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_CAUTION_STRIPES] = (function() {
    textures_drawStripes();
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_CAUTION_STRIPES_ALT] = (function() {
    textureContext.save();
    textureContext.translate(32, 32);
    textureContext.scale(-1, -1);
    
    textures_drawStripes();

    let dataUrl = textureCanvas.toDataURL();
    textureContext.restore();
    return dataUrl;
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_LIGHT_BARS] = (function() {
    textures_drawGrunge('#201b1b');
    //textures_drawTopLeftBorder('rgba(255, 255, 255, 0.2)');
  
    textures_drawRect(3, 5, 3, 22, 'rgba(255, 255, 255, 0.2)');
    textures_drawRect(4, 6, 3, 22, 'rgba(255, 255, 255, 0.2)');
  
    textures_drawRect(14, 5, 3, 22, 'rgba(255, 255, 255, 0.2)');
    textures_drawRect(15, 6, 3, 22, 'rgba(255, 255, 255, 0.2)');
  
    textures_drawRect(25, 5, 3, 22, 'rgba(255, 255, 255, 0.2)');
    textures_drawRect(26, 6, 3, 22, 'rgba(255, 255, 255, 0.2)');
  
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_NINE_BOLT_METAL] = (function() {
    textures_drawGrunge('#111111');
    //textures_drawTopLeftBorder('rgba(255, 255, 255, 0.2)');
  
    textures_drawTopLeftBorder('rgba(255, 255, 255, 0.05)');
    textures_drawBottomRightBorder('rgba(0, 0, 0, 0.3)');

    textures_drawBoltTexture();

    // // light in middle
    // textures_drawRect(13, 0, 3, 32, 'rgba(255, 0, 0, 0.2)');
    // textures_drawRect(14, 0, 3, 32, 'rgba(255, 0, 0, 0.1)');

    // // left
    // textures_drawRect(13, 0, 1, 32, 'rgba(0, 0, 0, 1)');

    // // right
    // textures_drawRect(16, 0, 1, 32, 'rgba(255, 255, 255, 0.2)');


  
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_FIB_METAL] = (function() {

    textures_drawGrunge('#1e1516');

    textures_addDepth(function(level) {
      let color = level === 0 ? 'rgba(0, 0, 0, 0.3)': 'rgba(59, 60, 62, 0.5)'
      textures_drawBorder(color, 3);


      textureContext.fillStyle = color;
      textureContext.fillRect(16, 4, 1, 24);

      textureContext.fillStyle = color;
      textureContext.fillRect(16, 15, 12, 1);

      //textureContext.stroke();
    });


    return textureCanvas.toDataURL();
  })();




  

  // unpack textures into an array of objects
  for (let n=0; n<textures.length; n++) {
    textures[n] = {
      encoding: textures[n]
    }
  }

  let loadedImages = 0;
  let numImages = 0;
  textures.forEach(function(texture) {
    (function() {
      numImages++;
      let glTexture = texture.glTexture = sceneContext.createTexture();
      let image = texture.image = new Image();
      image.onload = function() {
        sceneContext.activeTexture(sceneContext.TEXTURE0);
        sceneContext.bindTexture(sceneContext.TEXTURE_2D, glTexture);
        sceneContext.texImage2D(sceneContext.TEXTURE_2D, 0, sceneContext.RGBA, sceneContext.RGBA, sceneContext.UNSIGNED_BYTE, image);
        // TEXTURE_MAG_FILTER and NEAREST keep txture pixels sharp
        sceneContext.texParameteri(sceneContext.TEXTURE_2D, sceneContext.TEXTURE_MAG_FILTER, sceneContext.NEAREST);
        // WebGL1 has different requirements for power of 2 images
        sceneContext.generateMipmap(sceneContext.TEXTURE_2D);

        if (++loadedImages >= numImages) {
          callback();
        }
      };
      
      image.src = texture.encoding;
    })();
  });
};

// draw utils -----------------------------------------------------

function textures_drawRect(x, y, width, height, color) {
  textureContext.fillStyle = color;
  textureContext.fillRect(x, y, width, height);
}

function textures_drawPipeRidges() {
  for (let n=0; n<4; n++) {
    // highlight
    textureContext.fillStyle = 'rgba(255, 255, 255, 0.05)';
    textureContext.fillRect(n*8, 0, 4, 32);
  
    // shadow
    textureContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
    textureContext.fillRect(2 + n*8, 0, 4, 32);
  }
}

function textures_drawBolt(x, y) {
  textureContext.beginPath();
  textureContext.arc(x, y, 1.5, 0, Math.PI*2, false);
  textureContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
  textureContext.fill();

  textureContext.beginPath();
  textureContext.arc(x-1, y-1, 1.5, 0, Math.PI*2, false);
  textureContext.fillStyle = 'rgba(255, 255, 255, 0.1)';
  textureContext.fill();
}

function textures_drawBorder(color, inset) {
  textureContext.fillStyle = color;
  textureContext.fillRect(inset, inset, 1, 32-inset*2);
  textureContext.fillRect(31-inset, inset, 1, 32-inset*2);
  textureContext.fillRect(inset, inset, 32-inset*2, 1);
  textureContext.fillRect(inset, 31-inset, 32-inset*2, 1);
}

function textures_drawTopLeftBorder(color) {
  textureContext.fillStyle = color;
  textureContext.fillRect(0, 0, 31, 1); // top
  textureContext.fillRect(0, 0, 1, 31); // left
}

function textures_drawBottomRightBorder(color) {
  textureContext.fillStyle = color;
  textureContext.fillRect(31, 1, 1, 31); // right
  textureContext.fillRect(0, 31, 31, 1); // bottom
}

function textures_drawGrunge(color) {
  let rgb = textures_hexToRgb(color);
  let maxChannelOffset = 20;
  
  for (let x=0; x<32; x++) {
    for (let y=0; y<32; y++) {
      let grungeRgb = {
        r: textures_grungeChannel(rgb.r, maxChannelOffset),
        g: textures_grungeChannel(rgb.g, maxChannelOffset),
        b: textures_grungeChannel(rgb.b, maxChannelOffset)
      };
      let hexColor = textures_rgbToHex(grungeRgb);
      textureContext.fillStyle = hexColor;
      textureContext.fillRect(x, y, 1, 1);
    }
  }
}

function textures_drawStripes() {
  textures_drawGrunge('#807218');

  textureContext.fillStyle = 'rgba(0, 0, 0, 0.8)';

  textureContext.beginPath();
  textureContext.moveTo(0, 0);
  textureContext.lineTo(32, 32);
  textureContext.lineTo(16, 32);
  textureContext.lineTo(0, 16);
  textureContext.closePath();
  textureContext.fill();


  textureContext.beginPath();
  textureContext.moveTo(16, 0);
  textureContext.lineTo(32, 0);
  textureContext.lineTo(32, 16);
  textureContext.closePath();
  textureContext.fill();

  // highlight
  textureContext.fillStyle = 'rgba(255, 255, 255, 0.07)';
  textureContext.fillRect(0, 0, 1, 32);

  // shadow
  textureContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
  textureContext.fillRect(31, 0, 1, 32);
}

function textures_drawBolts() {
  textures_drawBolt(5, 5);
  textures_drawBolt(5, 27);
  textures_drawBolt(27, 5);
  textures_drawBolt(27, 27);
}

function textures_drawBoltTexture() {
  for (let x=6; x<32; x+=11) {
    for (let y=6; y<32; y+=11) {
      textures_drawBolt(x, y);
    }
  }
}

function textures_addDepth(func) {
  textureContext.save();
  textureContext.translate(1, 1);
  func(0);
  textureContext.restore();

  func(1);
};

function textures_hexToRgb(hex) {
  hex = hex.replace('#', '');
  var bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  }
}

function textures_componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function textures_rgbToHex(rgb) {
  return '#' + textures_componentToHex(rgb.r) + textures_componentToHex(rgb.g) + textures_componentToHex(rgb.b);
}

function textures_grungeChannel(channel, maxChannelOffset) {
  let newChannel = Math.floor(channel + Math.random() * maxChannelOffset);
  if (newChannel > 255) {
    newChannel = 255;
  }
  else if (newChannel < 0) {
    newChannel = 0;
  }
  return newChannel;
}

