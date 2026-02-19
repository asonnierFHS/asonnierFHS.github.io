// setup variables
const walkAcceleration = 2.5; // how much is added to the speed each frame
const gravity = 0.5; // how much is subtracted from speedY each frame
const friction = 1.5; // how much the player is slowed each frame
const maxSpeed = 8; // maximum horizontal speed, not vertical
const playerJumpStrength = 12; // this is subtracted from the speedY each jump
const projectileSpeed = 8; // the speed of projectiles
let shouldDrawGrid = false;
let gridMade = false;

/////////////////////////////////////////////////
//////////ONLY CHANGE ABOVE THIS POINT///////////
/////////////////////////////////////////////////

// Base game variables
const frameRate = 60;
const playerScale = 0.8; //makes the player just a bit smaller. Doesn't affect the hitbox, just the image

// Player variables
const player = {
  x: 50,
  y: 100,
  speedX: 0,
  speedY: 0,
  width: undefined,
  height: undefined,
  onGround: false,
  facingRight: true,
  deadAndDeathAnimationDone: false,
  winConditionMet: false,
};

let hitDx;
let hitDy;
let hitBoxWidth = 50 * playerScale;
let hitBoxHeight = 105 * playerScale;
let firstTimeSetup = true;

const keyPress = {
  any: false,
  up: false,
  left: false,
  down: false,
  right: false,
  space: false,
};

// Player animation variables
const animationTypes = {
  duck: "duck",
  flyingJump: "flying-jump",
  frontDeath: "front-death",
  frontIdle: "front-idle",
  jump: "jump",
  lazer: "lazer",
  run: "run",
  stop: "stop",
  walk: "walk",
};
let currentAnimationType = animationTypes.run;
let frameIndex = 0;
let jumpTimer = 0;
let duckTimer = 0;
let DUCK_COUNTER_IDLE_VALUE = 14;
let debugVar = false;

let spriteHeight = 0;
let spriteWidth = 0;
let spriteX = 0;
let spriteY = 0;
let offsetX = 0;
let offsetY = 0;

// Platform, cannon, projectile, and collectable variables
let platforms = [];
let fakePlatforms = [];
let badPlatforms = [];
let cannons = [];
const cannonWidth = 118;
const cannonHeight = 80;
let projectiles = [];
const defaultProjectileWidth = 24;
const defaultProjectileHeight = defaultProjectileWidth;
const collectableWidth = 40;
const collectableHeight = 40;
let collectables = [];

// canvas and context variables; must be initialized later
let canvas;
let ctx;

// setup function variable
let setup;

let halleImage;
let animationDetails = {};

var collectableList = {
  database: { image: "data:image/jpeg;base64,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" },
  diamond: { image: "images/collectables/diamond-head.png" },
  grace: { image: "images/collectables/grace-head.png" },
  kennedi: { image: "images/collectables/kennedi-head.png" },
  max: { image: "images/collectables/max-head.png" },
  steve: { image: "images/collectables/steve-head.png" },
};
