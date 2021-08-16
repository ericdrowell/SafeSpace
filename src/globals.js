const PLAYER_SPEED = 20; // units / s
const PLAYER_HEIGHT = 4;
const PLAYER_STEP_SPEED = 300; // ms

const GAME_STATE_TITLE = 0;
const GAME_STATE_INTRO = 1;
const GAME_STATE_PAUSED = 2;
const GAME_STATE_PLAYING = 3;
const GAME_STATE_DIED = 4;
const GAME_STATE_WIN = 5;

const PAIN_FLASH_DURATION = 200; // ms
const MENU_COOLDOWN = 0.5; // s
const BLOCK_NUM_VERTICES = 24;
const PIXEL_RATIO = (window && window.devicePixelRatio) || 1;
// gl drawElements can only handle 64k vertices.  Each block is defined by exactly 24 vertices.  Thus we can at most
// render 2,666 blocks for each drawElements call.  Exceeding this number will result in skipping of call draws for individual blocks
const BLOCKS_PER_BUFFER = 2666;
const BOBBLE_AMPLITUDE = 1; // webgl space
const BOBBLE_FREQUENCEY = 10;
const GRAVITY = -100; // units / second^2
const JUMP_SPEED = 30;
const FLASH_COOLDOWN = 100;
const CHAR_SPACING = 15;
const TEXT_HEIGHT = 75;
const CHAR_WIDTH = 45;
const GAME_ASPECT_RATIO = 16/9; // width/height
const OPTIMAL_VIEWPORT_WIDTH = 1300;
const OPTIMAL_VIEWPORT_HEIGHT = OPTIMAL_VIEWPORT_WIDTH / GAME_ASPECT_RATIO;
const RAY_TRACE_INCREMENT = 0.3;

let world = [];
let worldBuffers = {};
let hudCanvas;
let hudContext;
let openMenuTime = 0;
let elapsedTime = 0;
let lastTime = 0;
let now = 0;
let gameState;
let hasRendered = false;
let viewportWidth = 0;
let viewportHeight = 0;
let player = {};
let soundEffects;
let textures = {};
let sceneCanvas;
let sceneContext;
let mvMatrix; 
let pMatrix;
let mvMatrixStack = [];
let shaderProgram;
let hitShaderProgram;
let bobble = 0;
let bobbleCounter = 0;
let hudRatio;
let spritesReady = false;
let musicReady = false;
let gameReady = false;
let gameStarted = false;
let audio = null;
let idGenerator = 0;
let windowRatio;
let viewportScale;
let spriteCanvas;
let spriteContext;
let playerStep = 0;
let canvasLeft;
let hudDirty;
let musicPlaying;
let texturesReady = false;
let textureCanvas;
let textureContext;
let clickBlock = 0;
let audio_ctx;
let musicBuffer;
let firstRender = false;