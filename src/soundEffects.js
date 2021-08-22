
const SOUND_EFFECTS_START =               function(){zzfx(1,.05,217,.24,.03,.12,1,.58,1.1,0,0,0,0,0,-39,0,0,1,.15,0)};
const SOUND_EFFECTS_DIALOG =              function(){zzfx(1.88,.05,44,.13,.05,.12,1,.24,0,0,0,0,0,0,-0.1,0,.05,.07,.01,.76)};
const SOUND_EFFECTS_RUN =                 function(){zzfx(2.23,.05,738,0,.01,0,2,.45,0,18,0,0,0,.2,0,.7,.05,1,0,.49)};
const SOUND_EFFECTS_JUMP =                function(){zzfx(1.1,.05,48,0,.1,0,1,.08,3.6,0,0,0,0,0,0,0,.05,1,.06,0)};

// not used yet
const SOUND_EFFECTS_ENTER_SAFE_SPACE =    function(){zzfx(1.14,.05,24,.14,0,.07,0,2.81,-28,-28,0,0,0,0,251,0,.02,.81,.13,.59)};
const SOUND_EFFECTS_ROBOT =               function(){zzfx(1.13,.05,1673,.03,.21,.06,1,1.47,0,13,-605,0,.21,0,71,0,0,.58,0,.44)};
const SOUND_EFFECTS_COMPUTER =            function(){zzfx(1,.05,1373,.07,.05,.07,3,.16,0,0,292,.01,.07,0,0,0,0,1,.12,0)};
const SOUND_EFFECTS_NOTIFICATON =         function(){zzfx(1.46,.05,1090,.15,.2,.16,0,.28,0,0,-275,.24,0,0,0,0,.12,.74,.12,0)};

function soundEffects_play(sound) {
  sound();
}