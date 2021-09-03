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
  world_addSphere(0, 1.2, -1); // top sphere
}

function level_initLevel1() {
  // player.x = -251.9;
  // player.y = 26.5;
  // player.z = 45;
  // player.yaw = 0;

  // world_addRoom(-290, -200, 26, 50, -10, 50);
  // world_addSafeSpace(-262, 32, 18);
  // world_addSphere(-242, 32, 18);

  player.x = 0;
  player.y = 0.5;
  player.z = 0;
  player.yaw = 0;

  world_addGrateFloor(-10, 10, 0, -40, 10);
  world_addFloor(-5, 5, 0, -30, 10, TEXTURES_METAL_PLATE);
  world_addFloor(-4, 4, 0, -30, 10, TEXTURES_LIGHT_METAL);

  // front 
  world_addHexHoleXY(-10, 10, 0, 10, -30, TEXTURES_RUST);

  // back
  world_addHexHoleXY(-10, 10, 0, 10, 10, TEXTURES_RUST);
  world_addBlocks(-10, 10, 0, 10, 11, 11, TEXTURES_METAL_RIDGES);
}