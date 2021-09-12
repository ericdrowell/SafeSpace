
const SOUND_EFFECTS_START =                function(){zzfx(1,.05,217,.24,.03,.12,1,.58,1.1,0,0,0,0,0,-39,0,0,1,.15,0)};
const SOUND_EFFECTS_DIALOG =               function(){zzfx(1.88,.05,44,.13,.05,.12,1,.24,0,0,0,0,0,0,-0.1,0,.05,.07,.01,.76)};
const SOUND_EFFECTS_RUN =                  function(){zzfx(0.8,.05,87,0,0,0,3,.52,-68,0,-543,.01,0,0,-27,0,0,1,.01,0)};
const SOUND_EFFECTS_JUMP =                 function(){zzfx(1.1,.05,48,0,.1,0,1,.08,3.6,0,0,0,0,0,0,0,.05,1,.06,0)};
const SOUND_EFFECTS_ENTER_SAFE_SPACE =     function(){zzfx(1.99,.05,6,.09,.14,.46,1,.28,0,0,-54,.09,.06,0,0,0,.15,.54,.04,0)};
const SOUND_EFFECTS_EXIT_SAFE_SPACE =      function(){zzfx(2.66,.05,687,.23,.1,0,2,1.9,0,0,-568,0,.3,0,71,0,.36,1,.01,.85)};
const SOUND_EFFECTS_NOVA_EXPLOSION =       function(){zzfx(...[,,1875,.06,.19,3,3,.02,,18,-177,.24,,,-101,,,,1,.01])};
const SOUND_EFFECTS_NOVA_BLOCK =           function(){zzfx(1,.05,1321,.23,0,.2,2,1.22,1.1,-6.3,181,0,0,0,36,0,0,1,.17,0)};
const SOUND_EFFECTS_TERMINAL =             function(){zzfx(1,.05,1373,.07,.05,.07,3,.16,0,0,292,.01,.07,0,0,0,0,1,.12,0)};     
const SOUND_EFFECTS_FIELD_PROTECT =        function(){zzfx(...[,,1826,.25,,.16,3,.54,,,272,.04,.09,,,.6,,,.09])};      
const SOUND_EFFECTS_DIED =                 function(){zzfx(...[1.79,,1358,.23,.11,.17,3,1.42,-9,,,,,,41,,.41,,.12])};
const SOUND_EFFECTS_TERMINAL_BLIP =        function(){zzfx(...[,0,709,.01,.02,.03,1,.44,.1,3.2,,.02,.01,,,,,.3,.04])};   
const SOUND_EFFECTS_TERMINAL_NEW_LINE =    function(){zzfx(...[1.03,0,207,,.04,,1,1.97,,,207,.07,,,,.1,,.89,.08,.09])};   
const SOUND_EFFECTS_DOOR_OPEN =            function(){zzfx(...[1.59,,260,.24,,.05,,.7,64,,135,.22,.01,.1,,,.07,,.01,.54])};   
const SOUND_EFFECTS_DOOR_CLOSE =           function(){zzfx(...[1.86,,191,.05,.17,.01,1,2.28,,-81,476,,,.2,163,,.04,.33])}; 
const SOUND_EFFECTS_BUZZ =                 function(){zzfx(...[1.05,.5,201,.09,.04,.08,1,1.87,,-25,,,,,55,,,.4,.01])}; 
const SOUND_EFFECTS_TERMINAL_END =         function(){zzfx(...[,,345,.2,.03,.07,,2.62,-0.2,,193,.11,.21,,40,,,.42,.01])}; 
const SOUND_EFFECTS_NOVA_COUNTDOWN =       function(){zzfx(1.84,.05,74,.02,.14,.85,0,1.27,.6,.7,0,0,0,.4,-55,.4,.42,.86,.08,0)};
const SOUND_EFFECTS_WIN =                  function(){zzfx(...[1.3,,17,.1,.24,.33,,1.8,,-0.1,70,.03,.09,,,,.09,.98,.09])};
const SOUND_EFFECTS_RUMBLE =               function(){zzfx(...[,,538,1,.09,1,4,2.06,,-0.2,474,.04,,.6,.1,.5,,,1])};

// not used yet

// const SOUND_EFFECTS_NOVA_RESET =           function(){zzfx(...[1.06,,105,.06,.2,.69,1,.77,-8.4,,-37,.07,.05,,,,,.58,.09,.25])};

// const SOUND_EFFECTS_NOVA_RUMBLE =          function(){zzfx(...[,,538,1,.09,1,4,2.06,,-0.2,474,.04,,.6,.1,.5,,,6])};
// const SOUND_EFFECTS_NOVA_EXPLOSION =       function(){zzfx(...[,,1875,.06,.19,3,3,.02,,18,-177,.24,,,-101,,,,1,.01])};
//const SOUND_EFFECTS_NOVA_EXPLOSION =      function(){zzfx(...[,,1875,.06,.19,3,3,.02,,18,-177,.24,,,-101,,,,1,.01])};
//const SOUND_EFFECTS_EXPLOSION =           function(){zzfx(1,.05,855,0,.28,.85,4,2.92,0,.3,0,0,.18,.7,0,1,0,.97,.06,0)};
// const SOUND_EFFECTS_ACTIVATED =           function(){zzfx(1.56,.05,380,.03,.26,.42,0,.72,0,0,0,0,0,.2,-64,.7,.27,.88,.03,.24)};
// const SOUND_EFFECTS_ROBOT =               function(){zzfx(1.13,.05,1673,.03,.21,.06,1,1.47,0,13,-605,0,.21,0,71,0,0,.58,0,.44)};
// const SOUND_EFFECTS_NOTIFICATON =         function(){zzfx(1.46,.05,1090,.15,.2,.16,0,.28,0,0,-275,.24,0,0,0,0,.12,.74,.12,0)};
// const SOUND_EFFECTS_NOVA =                function(){zzfx(1.63,.05,34,0,.38,.8,1,1.08,.4,.8,0,0,0,.6,0,.9,.47,.88,.09,0)};
// zzfx(2.02,.05,147,0,.06,.05,0,.86,-8.7,0,0,0,0,.2,22,.3,.14,.84,.05,.12) monster talking
// zzfx(1.84,.05,74,.02,.14,.85,0,1.27,.6,.7,0,0,0,.4,-55,.4,.42,.86,.08,0) kind of like a sinister countdown
// zzfx(1.98,.05,22,0,.23,.06,4,.27,.2,32,-259,.01,0,0,0,.1,.01,.34,.03,.17) electricity
// zzfx(1.32,.05,1124,.02,.2,0,0,.26,0,-0.1,0,0,0,0,89,0,.29,1,.12,.04); robotic computer voice
// zzfx(1.99,.05,24,.17,0,.06,2,.26,0,0,0,0,0,.2,0,0,.45,1,.21,0); sinster presence
// zzfx(...[1.99,,146,.02,.23,.04,3,2.47,-1.3,,,,,,-112,,.2,.99,.04]);
//zzfx(...[1.51,,455,,.36,.95,2,.2,.4,.7,,,,.8,,.1,.26,.88]); // alarm
function soundEffects_play(sound) {
  sound();
}