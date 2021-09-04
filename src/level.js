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
  player.x = 4;
  player.y = 0.5;
  player.z = 0;
  player.yaw = 0;

  // floors
  world_addFloor(-8, 16, 0, -40, 10);
  world_addFloor(-28, 36, 0, -200, -41);

  // walls
  world_addWallXY(-9, 17, 0, 12, 9);
  world_addWallXY(-9, 17, 0, 12, -39);
  world_addWallXY(-9, 17, 0, 12, -41);

  world_addWallYZ(-9, 0, 12, -41, 10);
  world_addWallYZ(17, 0, 12, -41, 10);

  // reactors
  world_addReactor(-8, 6, -70);

  // safe spaces
  world_addSafeSpace(20, 6, -120);

  // celings
  world_addCeiling(-8, 16, 13, -41, 10);
  
  // doors
  world_addDoorXY(4, 2, -40);
}