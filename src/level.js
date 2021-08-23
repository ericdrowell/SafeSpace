function level_init() {
  level_initLevel1();
  webgl_buildBuffers();
}

function level_initLevel1() {

  // -------------------- LEVEL 1 --------------------
  world_addRoom(-290, -200, 26, 50, -10, 50, TEXTURES_PURPLE_STONE, TEXTURES_BIO_PURPLE, TEXTURES_ROTTING_WOOD);
  world_addSafeSpace(-262, 32, 18);


  world_addSphere(-242, 32, 18);
}