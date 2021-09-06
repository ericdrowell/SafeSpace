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
  world_addRoom(-25, 33, 0, 24, -199, -41);

  world_addStartRoom(-9, 17, 0, 13, -40, 8);
  world_addEndRoom(-9, 17, 0, 13, -249, -200);

  // reactors
  world_addReactor(-8, 0, 10, 24, -120, 6, 12);

  // safe spaces
  world_addSafeSpace(20, 6, -120);
  
}