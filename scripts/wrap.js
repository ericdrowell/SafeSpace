var fs = require('fs')
fs.readFile('./dist/game-concatenated.js', 'utf8', function (err, jsContent) {
  if (err) {
    return console.log(err);
  }

  var newJsContent = '(function(){' + jsContent + '})();';

  fs.writeFile('./dist/game-wrapped.js', newJsContent, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});