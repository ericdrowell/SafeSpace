function modelView_save() {
  var copy = mat4.create();
  mat4.set(mvMatrix, copy);
  mvMatrixStack.push(copy);
};

function modelView_restore() {
  mvMatrix = mvMatrixStack.pop();
};