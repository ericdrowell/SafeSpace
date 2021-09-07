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

  // main rooms
  world_addRoom(-25, 33, -10, 24, 41, 199);

  // platforms
  world_addPlatform(-25, 33, -10, 0, 41, 71);
  world_addPlatform(-25, 33, -10, 0, 191, 199);
  world_addPlatform(14, 23, -10, 1, 83, 105);
  world_addPlatform(10, 16, -10, 2, 99, 112);
  world_addPlatform(-14, -2, -10, 4, 111, 123);
  world_addPlatform(-24, -5, -10, -1, 140, 147);
  world_addPlatform(-15, 0, -10, 0, 161, 175);
  world_addPlatform(-25, -15, -10, 0, 71, 73);
  

  // transition rooms
  world_addTransitionRoom(-9, 17, 0, 13, -8, 40, true);
  world_addTransitionRoom(-9, 17, 0, 13, 200, 249, false);

  startZone = [-25, 33, 0, 13, 90, 90+10];
  endZone = [-9, 17, 0, 13, 200+20, 200+30];


  // reactors
  world_addReactor(20, -10, 10, 24, 164, 0, 12);

  // safe spaces
  world_addSafeSpace(-9, 10, 116);

  // stairs
  world_addStairs(-25, -15, -10, 73, 9);
  
}