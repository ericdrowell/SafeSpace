const PIXEL_RATIO = (window && window.devicePixelRatio) || 1;
const PLAYER_SPEED = 30; // units / s
const PLAYER_HEIGHT = 6;
const PLAYER_STEP_SPEED = 300; // ms
const GAME_STATE_TITLE = 0;
const GAME_STATE_LEVEL_INTRO = 1;
const GAME_STATE_PLAYING = 2;
const GAME_STATE_PAUSED = 3;
const GAME_STATE_DIED = 4;
const GAME_STATE_WIN = 5;
const MENU_COOLDOWN = 0.5; // s
// gl drawElements can only handle 64k vertices.  Each block is defined by exactly 24 vertices.  Thus we can at most
// render 2,666 blocks for each drawElements call.  Exceeding this number will result in skipping of call draws for individual blocks
const BLOCKS_PER_BUFFER = 2666;
const STAND_BOBBLE_AMPLITUDE = 0.002; // webgl space
const STAND_BOBBLE_FREQUENCEY = 3;
const RUN_BOBBLE_AMPLITUDE = 1; // webgl space
const RUN_BOBBLE_FREQUENCEY = 10;
const GRAVITY = -50; // units / second^2
const JUMP_SPEED = 20;
const FLASH_COOLDOWN = 100;
const CHAR_SPACING = 15;
const TEXT_HEIGHT = 75;
const CHAR_WIDTH = 45;
const GAME_ASPECT_RATIO = 16/9; // width/height
const OPTIMAL_VIEWPORT_WIDTH = 1300;
const OPTIMAL_VIEWPORT_HEIGHT = OPTIMAL_VIEWPORT_WIDTH / GAME_ASPECT_RATIO;
const RAY_TRACE_INCREMENT = 0.3;
const SAFE_SPACE_SIZE = 5;
const NOVA_START_RADIUS = 2;
const NOVA_EXPAND_SPEED = 20; // per second
const NOVA_MAX_RADIUS = 500;
const TERMINAL_PRINT_CHAR_DELAY = 10; // ms
const TERMINAL_PRINT_DELAY = 2000; // ms
const DOOR_STATE_CLOSED = 0;
const DOOR_STATE_OPENING = 1;
const DOOR_STATE_OPEN = 2;
const DOOR_STATE_CLOSING = 3;
const DOOR_OPEN_SPEED = 20; // units / s
const BUZZ_CHANCES = 0.01;
const TITLE_START_OFF_TIME = 1000; // ms
const TITLE_START_DURATION = 2000; // ms total title start cycle, includes on and off 
const NOVA_RUMBLE_DURATION = 2000; // ms
const RUMBLE_MAX_OFFSET = 0.3;

let level = 0;
let world = []; // world blocks
let worldFields = [];
let reactors = [];
let novas = [];
let worldBuffers = {};
let fieldBuffers = {};
let sphereBuffers = {};
let hudCanvas;
let hudContext;
let openMenuTime = 0;
let startTime = 0;
let totalElapsedTime = 0;
let elapsedTime = 0;
let lastTime = 0;
let now = 0;
let gameState;
let viewportWidth = 0;
let viewportHeight = 0;
let player = {};
let player_jumpNum = 0;
let soundEffects;
let textures = [];
let sceneCanvas;
let sceneContext;
let mvMatrix; 
let pMatrix;
let mvMatrixStack = [];
let shaderProgram;
let perlinShaderProgram;
let bobble = 0;
let pitchBobble = 0;
let bobbleTime = 0;
let pitchBobbleTime = 0;
let hudRatio;
let musicReady = false;
let gameReady = false;
let gameStarted = false;
let idGenerator = 0;
let windowRatio;
let viewportScale;
let playerStep = 0;
let musicPlaying;
let texturesReady = false;
let textureCanvas;
let textureContext;
let musicBuffer;
let terminalEl;
let terminalTextEl;
let titleEl;
let titleTextEl;
let doors = [];
let doorBuffers = {};
let doorEndBuffers = {};
let terminalMessageTimeout;
let terminalCharTimeout;
let isPlayerSafe = true;
let playerEnteredLevel = false;
let terminalPrinting = false;
let terminalRange = [];
let startZone;
let endZone;
let titleStartLeft;
let poisonPlanes = [];
let genericCubeBuffer;
let novaRumbleLeft;