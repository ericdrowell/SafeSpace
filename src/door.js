
function door_add(x, y, z, isActive) {
  doors.push({
    x: x,
    y: y,
    z: z,
    offset: 0, // used for opening and closing
    state: DOOR_STATE_CLOSED,
    isActive: isActive
  });
}

function door_update() {
  doors.forEach(function(door) {
    // open doors if you are in range
    if (player_nearDoor(door) && door.state === DOOR_STATE_CLOSED) {
      if (door.isActive) {
        door.state = DOOR_STATE_OPENING;
        soundEffects_play(SOUND_EFFECTS_DOOR_OPEN);
      }
    }
    else if (!player_nearDoor(door) && door.state === DOOR_STATE_OPEN) {
      door.state = DOOR_STATE_CLOSING;
      soundEffects_play(SOUND_EFFECTS_DOOR_CLOSE);
    }

    // udpate opening doors
    let distEachFrame = DOOR_OPEN_SPEED * elapsedTime / 1000;
    if (door.state === DOOR_STATE_OPENING) {
      door.offset += distEachFrame;

      if (door.offset > 8) {
        door.offset = 8;
        door.state = DOOR_STATE_OPEN;
      }
    }
    else if (door.state === DOOR_STATE_CLOSING) {    
      door.offset -= distEachFrame;

      if (door.offset < 0) {
        door.offset = 0;
        door.state = DOOR_STATE_CLOSED;
      }
    }
  });
}