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



  // walls
  world_addBlocks(-8, 16, 0, 12, 8, 8, TEXTURES_SMOOTH_METAL);
  world_addBlocks(-8, -8, 0, 12, -41, 10, TEXTURES_SMOOTH_METAL);
  world_addBlocks(16, 16, 0, 12, -41, 10, TEXTURES_SMOOTH_METAL);

  // safe spaces
  world_addSafeSpace(4, 6, -80);

  // celings
  world_addBlocks(-8, 16, 13, 13, -41, 10, TEXTURES_METAL_RIDGES);



  // doors
  world_addDoorBorder(4, 1, -38, TEXTURES_METAL_PLATE_WITH_BOLTS);
  world_addDoorHoleXY(4, 1, -39);
  door_add(4, 2, -40);
  world_addDoorHoleXY(4, 1, -41);
  world_addDoorBorder(4, 1, -42, TEXTURES_METAL_PLATE_WITH_BOLTS);
}