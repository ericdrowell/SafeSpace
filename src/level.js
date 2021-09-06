function level_init() {
  world = {};
  worldFields = [];
  reactors = [];
  novas = [];
  doors = [];
  safeRooms = [];
  novaCountingDown = false;
  isNovaExploding = false;
  isPlayerSafe = true;
  playerEnteredLevel = false;

  player_init();

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
  novaCountdownTime = 6;

  world_addSafeSpace(0, -2, -26);
  nova_addBurst({
    x: 0, 
    y: 1.2, 
    z: -1, 
    radius: NOVA_START_RADIUS
  }); 
}

function level_initLevel1() {
  player.x = 4;
  player.y = 0.5;
  player.z = 0;
  player.yaw = 0;

  // rooms
  world_addSafeRoom(-9, 17, 0, 13, -41, 9);
  world_addRoom(-25, 33, 0, 24, -199, -41);
  world_addSafeRoom(-9, 17, 0, 13, -249, -199);

  // reactors
  world_addReactor(-8, 6, -120, 6, 6);

  // safe spaces
  world_addSafeSpace(20, 6, -120);

  // doors
  world_addWallXY(-25, 33, 0, 13, -39);
  world_addDoorXY(4, 2, -40);
  
  world_addWallXY(-25, 33, 0, 13, -201);
  world_addDoorXY(4, 2, -200);
  
}