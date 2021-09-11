function level_init() {
  world = {};
  worldFields = [];
  reactors = [];
  novas = [];
  doors = [];
  poisonPlanes = [];

  player_init();

  if (gameState === GAME_STATE_TITLE) {
    level_initTitleLevel();
  }
  else if (level === 1) {
    level_initLevel1();
  }
  else if (level === 2) {
    level_initLevel2();
  }

  webgl_buildBuffers();
}

function level_initTitleLevel() {
  player.x = 0;
  player.y = -PLAYER_HEIGHT; // eye level
  player.z = 0;
  player.yaw = Math.PI;

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
  startZone = [-25, 33, 0, 13, 80, 80+10];
  endZone = [-9, 17, 0, 13, 200+10, 200+20];
  poisonPlanes = [];

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
  world_addStartRoom(-10, 18, 0, 17, -8, 40);
  world_addEndRoom(-10, 18, 0, 17, 200, 249);

  // reactors
  world_addReactor(20, -10, 10, 24, 164, 4, 20);

  // safe spaces
  world_addSafeSpace(-9, 10, 116);

  // stairs
  world_addStairs(-25, -15, -10, 73, 9, 1);

  // crates
  world_addCrate(14, 1, 20);
  world_addCrate(13, 1, 25);
  world_addCrate(14, 5, 23);

  world_addCrate(-13, 1, 44);
  world_addCrate(-18, 1, 44);
  world_addCrate(-22, 1, 45);
  
}

function level_initLevel2() {
  player.x = 0;
  player.y = 0;
  player.z = 0;
  player.yaw = Math.PI;
  startZone = [-25, 25, 0, 13, 80, 80+10];
  endZone = [-9, 17, 0, 13, 200+10, 200+20];

  // main rooms
  world_addPoisonRoom(-25, 50, -30, 24, 71, 199);


  // stairs
  world_addStairs(-25, -18, 0, 103, 10, -1);

  // platforms
  world_addPlatform(-25, 33, -30, 0, 72, 82);
  world_addPlatform(-25, -17, -30, 0, 82, 110);
  world_addPlatform(-25, -18, 0, 10, 102, 110);
  world_addPlatform(-25, -18, -30, 5, 130, 140);



  // transition rooms
  world_addStartRoom(-10, 10, 0, 17, -8, 70);



  // reactors
  world_addReactor(0, -30, 10, 24, 100, 400, 10);

  // safe spaces
  world_addSafeSpace(8, 0, 140);


}