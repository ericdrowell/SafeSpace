const TEXTURES_INVISIBLE    = -1;
const TEXTURES_METAL_GRATES = 0;
const TEXTURES_METAL_PLATE = 1;
const TEXTURES_METAL_RIDGES = 2;
const TEXTURES_METAL_PLATE_WITH_BOLTS = 3;
const TEXTURES_METAL_PANELS = 4;
const TEXTURES_CONSTRUCTION_STRIPES = 5;
const TEXTURES_LIGHT = 6;
const TEXTURES_STENCIL_PLATE = 7;

function textures_init(callback) {
  // -------------------------------------------------------------------
  textures[TEXTURES_METAL_GRATES] = (function() {
    textures_drawGrunge('#161616', 20);
    textureContext.strokeStyle = 'rgba(0, 0, 0, 0.9)';
    textureContext.lineWidth = 4;
    textureContext.lineCap = 'round';
  
    textureContext.beginPath();
    textureContext.moveTo(8, 16);
    textureContext.lineTo(8, 28);
    textureContext.stroke();
  
    textureContext.beginPath();
    textureContext.moveTo(24, 4);
    textureContext.lineTo(24, 16);
    textureContext.stroke();
    
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_METAL_PLATE] = (function() {
    textures_drawGrunge('#080808', 20);
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_METAL_RIDGES] = (function() {
    textures_drawGrunge('#080808', 20);

    for (let n=0; n<5; n++) {
      // highlight
      textureContext.fillStyle = 'rgba(255, 255, 255, 0.07)';
      textureContext.fillRect(5 + n*5, 2, 1, 27);
    
      // shadow
      textureContext.fillStyle = 'rgba(0, 0, 0, 0.2)';
      textureContext.fillRect(5 + n*5+1, 3, 1, 27);
    }
  
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_METAL_PLATE_WITH_BOLTS] = (function() {
    textures_drawGrunge('#2d2014', 20);
    textures_drawBorder('rgba(0, 0, 0, 0.5)', 0);
  
    textures_drawBolt(5, 5);
    textures_drawBolt(5, 27);
    textures_drawBolt(27, 5);
    textures_drawBolt(27, 27);
  
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_METAL_PANELS] = (function() {
    textures_drawGrunge('#140f09', 20);

    // highlight
    textureContext.fillStyle = 'rgba(255, 255, 255, 0.07)';
    textureContext.fillRect(0, 0, 1, 32);
  
    // shadow
    textureContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
    textureContext.fillRect(31, 0, 1, 32);
  
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_CONSTRUCTION_STRIPES] = (function() {
    textures_drawGrunge('#807218', 20);

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
  
    return textureCanvas.toDataURL();
  })();

  // -------------------------------------------------------------------
  textures[TEXTURES_LIGHT] = (function() {
    textures_drawGrunge('#201b1b', 20);
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
  textures[TEXTURES_STENCIL_PLATE] = (function() {

    textures_drawGrunge('#1e1516', 20);

    textures_addDepth(function(level) {
      let color = level === 0 ? 'rgba(0, 0, 0, 0.5)': 'rgba(59, 60, 62, 0.7)'
      textures_drawBorder(color, 3);

      textureContext.beginPath();
      textureContext.moveTo(16, 4);
      textureContext.lineTo(16, 28);
      textureContext.lineWidth = 1;
      textureContext.strokeStyle = color;
      textureContext.stroke();

      textureContext.beginPath();
      textureContext.moveTo(17, 16);
      textureContext.lineTo(27, 16);
      textureContext.lineWidth = 1;
      textureContext.strokeStyle = color;
      textureContext.stroke();
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

function textures_drawBolt(x, y) {
  textureContext.beginPath();
  textureContext.arc(x, y, 2, 0, Math.PI*2, false);
  textureContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
  textureContext.fill();

  textureContext.beginPath();
  textureContext.arc(x-1, y-1, 2, 0, Math.PI*2, false);
  textureContext.fillStyle = 'rgba(255, 255, 255, 0.1)';
  textureContext.fill();
}

function textures_drawBorder(color, inset) {
  textureContext.lineWidth = 1;
  textureContext.strokeStyle = color;
  textureContext.strokeRect(inset, inset, 32-inset*2, 32-inset*2);
}

function textures_drawTopLeftBorder(color) {
  textureContext.fillStyle = color;
  textureContext.fillRect(1, 0, 30, 1); // top
  textureContext.fillRect(0, 1, 1, 30); // left
}

function textures_drawGrunge(color, maxChannelOffset) {
  let rgb = textures_hexToRgb(color);
  
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

function textures_addDepth(func) {
  textureContext.save();
  textureContext.translate(2, 2);
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

