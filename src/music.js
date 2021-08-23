let music_songData; 
let music_audioNode; // AudioBufferSourceNode - https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode

function music_init(song) {
  music_songData = zzfxM(...song);
}

function music_play() {
  music_audioNode = zzfxP(...music_songData);
  music_audioNode.loop = true;
}

function music_stop() {
  music_audioNode.stop();
}