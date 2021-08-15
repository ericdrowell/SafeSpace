function utils_getRandomElement(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

// fast concat
function utils_concat(a, b) {
  a.push.apply(a, b);
}

function utils_generateId() {
  return idGenerator++;
}