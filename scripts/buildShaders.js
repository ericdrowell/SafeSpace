const fs = require('fs');

fs.readdir('src/shaders', function(err, files) {
  files.forEach(function(file) {
    
    if (file === '.DS_Store') {
      console.log('skipping ' + file);
    }
    else {
      console.log('reading ' + file + '...');
      let glslStr = fs.readFileSync('dist/shaders/' + file, 'utf-8');
      let variableName = file.replace('.glsl', '');
      let jsStr = 'const ' + variableName + ' = `' + glslStr + '`;';

      fs.writeFileSync('dist/shaders/' + file + '.js', jsStr, 'utf-8');
    }

  });
});