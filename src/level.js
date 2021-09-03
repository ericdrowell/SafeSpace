function level_init() {
  world = {};
  worldFields = [];
  worldSpheres = [];
  doors = [];

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

  player.x = 4;
  player.y = 0.5;
  player.z = 0;
  player.yaw = 0;

  // floors
  world_addGrateFloor(-8, 16, 0, -100, 10);

  // doors
  door_add(0, 1, -20);

  // holes 
  world_addHexHoleXY(-8, 16, 0, 10, -32);
  world_addHexHoleXY(-8, 16, 0, 10, -40);
  world_addHexHoleXY(-8, 16, 0, 10, 8);

  // walls
  world_addBlocks(-8, 16, 0, 10, 9, 9, TEXTURES_METAL_RIDGES);
  world_addBlocks(-8, -8, 0, 10, -48, 10, TEXTURES_METAL_RIDGES);
  world_addBlocks(16, 16, 0, 10, -48, 10, TEXTURES_METAL_RIDGES);

  // safe spaces
  world_addSafeSpace(4, 6, -80);

  // celings
  world_addBlocks(-8, 16, 10, 10, -48, 10, TEXTURES_METAL_RIDGES);
}