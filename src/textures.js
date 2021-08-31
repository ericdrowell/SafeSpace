const TEXTURES_INVISIBLE    = -1;
const TEXTURES_METAL_GRATES = 0;
const TEXTURES_METAL_PLATE = 1;
const TEXTURES_METAL_RIDGES = 2;
const TEXTURES_METAL_PLATE_WITH_BOLTS = 3;
const TEXTURES_METAL_PANELS = 4;
const TEXTURES_BLUE_PLATE = 5;

function textures_init(callback) {
  textures = [
    {
      encoding: textures_createMetalGrates()
    },
    {
      encoding: textures_createMetalPlate()
    },
    {
      encoding: textures_createMetalRidges()
    },
    {
      encoding: textures_createMetalPlateWithBolts()
    },
    {
      encoding: textures_createMetalPanels()
    },
    {
      encoding: textures_createBluePlate()
    }
  ];

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

function textures_createMetalGrates() {
  textures_drawGrunge('#161616', 20);
  //textures_drawBorder('rgba(0, 0, 0, 0.5)', 1);

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
}

function textures_createMetalPlate() {
  textures_drawGrunge('#080808', 20);
  //textures_drawBorder('rgba(0, 0, 0, 0.5)', 1);

  return textureCanvas.toDataURL();
}

function textures_createBluePlate() {
  textures_drawGrunge('#cccccc', 20);
  //textures_drawBorder('rgba(0, 0, 0, 0.5)', 1);

  return textureCanvas.toDataURL();
}




function textures_createMetalRidges() {
  textures_drawGrunge('#080808', 20);
  //textures_drawBorder('rgba(0, 0, 0, 0.5)', 1);

  for (let n=0; n<5; n++) {
    // highlight
    textureContext.fillStyle = 'rgba(255, 255, 255, 0.07)';
    textureContext.fillRect(5 + n*5, 2, 1, 27);
  
    // shadow
    textureContext.fillStyle = 'rgba(0, 0, 0, 0.2)';
    textureContext.fillRect(5 + n*5+1, 3, 1, 27);
  }

  return textureCanvas.toDataURL();
}

function textures_createMetalPanels() {
  textures_drawGrunge('#140f09', 20);
  //textures_drawBorder('rgba(0, 0, 0, 0.5)', 1);

  // highlight
  textureContext.fillStyle = 'rgba(255, 255, 255, 0.07)';
  textureContext.fillRect(0, 0, 1, 32);

  // shadow
  textureContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
  textureContext.fillRect(31, 0, 1, 32);

  return textureCanvas.toDataURL();
}

function textures_createMetalPlateWithBolts() {
  textures_drawGrunge('#2d2014', 20);
  textures_drawBorder('rgba(0, 0, 0, 0.5)', 1);

  textures_drawBolt(5, 5);
  textures_drawBolt(5, 27);
  textures_drawBolt(27, 5);
  textures_drawBolt(27, 27);



  return textureCanvas.toDataURL();
}

// ------------------- TEXTURE UTILS -------------------

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

function textures_drawBorder(color, size) {
  textureContext.fillStyle = color;
  textureContext.fillRect(0, 0, size, 32);
  textureContext.fillRect(32-size, 0, size, 32);
  textureContext.fillRect(0, 0, 32, size);
  textureContext.fillRect(0, 32-size, 32, size);
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

