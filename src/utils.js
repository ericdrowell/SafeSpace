// fast concat
function utils_concat(a, b) {
  a.push.apply(a, b);
}