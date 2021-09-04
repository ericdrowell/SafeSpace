function door_init() {

}

function door_add(x, y, z) {
  doors.push({
    x: x,
    y: y,
    z: z,
    offset: 0, // used for opening and closing
    state: DOOR_STATE_CLOSED
  });
}

function door_open(index) {
  doors[index].state = DOOR_STATE_OPENING;
}

function door_update() {
  doors.forEach(function(door) {
    if (door.state === DOOR_STATE_OPENING) {
      let distEachFrame = DOOR_OPEN_SPEED * elapsedTime / 1000;
      door.offset += distEachFrame;

      if (door.offset > 8) {
        door.state = DOOR_STATE_OPEN;
      }
    }
  });
}