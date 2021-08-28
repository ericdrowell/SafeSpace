function level_init() {
  world = {};
  worldFields = [];
  worldSpheres = [];

  if (gameState === GAME_STATE_TITLE) {
    level_initTitleLevel();
  }
  else {
    level_initLevel1()
  }

  webgl_buildBuffers();
}

function level_initTitleLevel() {
  player.x = 0;
  player.y = -4;
  player.z = 0;
  player.yaw = 0;

  world_addField(0, 5, -7);

  world_addSphere(0, -1.2, -1);
  //world_addSphere(0, -1.2, -4);
}

function level_initLevel1() {
  player.x = -251.9;
  player.y = 26.5;
  player.z = 45;
  player.yaw = 0;

  world_addRoom(-290, -200, 26, 50, -10, 50, TEXTURES_PURPLE_STONE, TEXTURES_BIO_PURPLE, TEXTURES_ROTTING_WOOD);
  world_addSafeSpace(-262, 32, 18);

  world_addSphere(-242, 32, 18);
}