function level_init() {
  world = {};
  worldFields = [];
  reactors = [];
  novas = [];
  doors = [];
  dieZones = [];

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
    radius: NOVA_START_RADIUS,
    isCore: true
  }); 
}

function level_initLevel1() {
  player.x = 4;
  player.y = 0.5;
  player.z = 0;
  player.yaw = 0;

  // rooms
  world_addRoom(-25, 33, 0, 24, -199, -41);

  world_addTransitionRoom(-9, 17, 0, 13, -40, 8, true);
  world_addTransitionRoom(-9, 17, 0, 13, -249, -200, false);

  // reactors
  world_addReactor(-8, 0, 10, 24, -120, 6, 12);

  // safe spaces
  world_addSafeSpace(20, 6, -120);
  
}