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
  player.yaw = Math.PI;
  novaCountdownTime = 6;

  world_addSafeSpace(0, -2, 26);
  nova_addBurst({
    x: 0, 
    y: 1.2, 
    z: 1, 
    radius: NOVA_START_RADIUS,
    isCore: true
  }); 
}

function level_initLevel1() {
  player.x = 4;
  player.y = 0.5;
  player.z = 0;
  player.yaw = Math.PI;

  // rooms
  world_addRoom(-25, 33, 0, 24, 41, 199);

  world_addTransitionRoom(-9, 17, 0, 13, -8, 40, true);
  world_addTransitionRoom(-9, 17, 0, 13, 200, 249, false);

  // reactors
  world_addReactor(20, 0, 10, 24, 164, 4, 12);

  // safe spaces
  world_addSafeSpace(-8, 6, 116);
  
}