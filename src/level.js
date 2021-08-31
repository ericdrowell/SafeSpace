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
  player.y = -PLAYER_HEIGHT; // eye level
  player.z = 0;
  player.yaw = 0;

  world_addSafeSpace(0, -2, -26);

  //world_addSphere(0, -1.2, -1); // bottom sphere

  //world_addPlane(-20, 20, -20, 20, -20, -20, TEXTURES_METAL_PLATE_WITH_BOLTS);
  //world_removePlane(-4, 4, -6, 3, -20, -20);

  world_addSphere(0, 1.2, -1); // top sphere

  
  

  //world_addSphere(0, -1.2, -4);
}

function level_initLevel1() {
  player.x = -251.9;
  player.y = 26.5;
  player.z = 45;
  player.yaw = 0;

  world_addRoom(-290, -200, 26, 50, -10, 50);
  world_addSafeSpace(-262, 32, 18);

  world_addSphere(-242, 32, 18);
}