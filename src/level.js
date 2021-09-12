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
  poisonPlanes = [];

  // main rooms
  world_addRoom(-25, 33, -10, 24, 41, 260);

  // platforms
  world_addPlatform(-25, 33, -10, 0, 41, 71);
  world_addPlatform(-25, 33, -10, 0, 220, 260);
  world_addPlatform(28, 33, -10, 1, 83, 105);
  world_addPlatform(10, 16, -10, 2, 102, 112);
  world_addPlatform(-14, -2, -10, 4, 111, 123);
  world_addPlatform(-14, -5, -10, -1, 140, 147);
  world_addPlatform(0, 15, -10, 0, 161, 175);
  world_addPlatform(-25, -15, -10, 0, 71, 73);
  world_addPlatform(28, 33, -10, 1, 180, 200);

  // walls
  world_addWallXY(10, 33, 0, 24, 240);
  world_addWallYZ(10, 0, 24, 240, 260);
  
  // transition rooms
  world_addStartRoom(-10, 18, 0, 17, -8, 40);
  world_addEndRoom(-20, 8, 0, 17, 261, 300);

  // reactors
  world_addReactor(15, -10, 10, 24, 190, 4, 20);

  // safe spaces
  world_addSafeSpace(-9, 10, 116);

  // stairs
  world_addStairs(-25, -15, -10, 73, 9, 1);

  // crates
  world_addThreeCratePileYZ(13, 1, 23);
  world_addThreeCratesXY(-18, 1, 44);
  world_addThreeCratesXY(-18, 5, 44);
  world_addThreeCratePileYZ(-22, 1, 50);
  world_addThreeCratePileYZ(31, 1, 50);
  world_addThreeCratesXY(5, 1, 170);
  world_addThreeCratesXY(25, 1, 236);
  world_addThreeCratePileYZ(-23, 1, 231);
  world_addThreeCratePileYZ(7, 1, 249);
  
}

function level_initLevel2() {
  player.x = 0;
  player.y = 0;
  player.z = 0;
  player.yaw = Math.PI;

  // main rooms
  world_addPoisonRoom(-25, 50, -30, 24, 71, 294);


  // stairs
  // startX, endX, startY, z, startZDepth, zDirection
  world_addStairs(-25, -18, 0, 103, 10, -1);
  world_addStairs(45, 50, -20, 160, 10, -1);

  // platforms
  world_addPlatform(-25, 23, -30, 0, 72, 82);
  world_addPlatform(-25, -17, -30, 0, 82, 110);
  world_addPlatform(-25, -18, 0, 10, 102, 110);
  world_addPlatform(-25, -18, -30, 5, 130, 140);
  world_addPlatform(2, 14, -30, -6, 134, 146); // under safe space
  world_addPlatform(44, 50, -30, -20, 134, 160); 
  world_addPlatform(44, 50, -30, -10, 160, 180); 
  world_addPlatform(28, 36, -30, -5, 180, 188); 
  world_addPlatform(16, 32, -30, -2, 200, 250); 
  world_addPlatform(10, 20, -30, 0, 260, 270);
  world_addPlatform(-25, 50, -30, 2, 280, 294);



  // transition rooms
  world_addStartRoom(-10, 10, 0, 17, -8, 70);
  world_addEndRoom(18-10, 18+10, 2, 17, 295, 330);

  // reactors
  world_addReactor(-3, -30, 10, 24, 100, 4, 8);

  // safe spaces
  world_addSafeSpace(8, 0, 140);

  // crates
  world_addCrate(47, -9, 175);
  // box cluster platform
  world_addThreeCratesXY(26, -1, 202);
  world_addCratesPile(26, -1, 216);
  world_addThreeCratePileYZ(18, -1, 210);

  world_addThreeCratesXY(26, -1, 222);
  world_addCratesPile(20, -1, 236);
  world_addThreeCratePileYZ(28, -1, 230);


}