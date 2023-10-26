// Vietnam Defender

// Elementos de DOM
let startBtnNode = document.querySelector("#start-btn");
let splashScreenNode = document.querySelector("#splash-screen");
let gameScreenNode = document.querySelector("#game-screen");
let gameBoxNode = document.querySelector("#game-box");
let cannonBallNode = document.querySelector("#cannonBall");
let scoreNode = document.querySelector("#game-info");
let scoreH1Node = scoreNode.querySelector("h1");
let scoreOverH3Node = scoreNode.querySelector("h3");
let gameOverNode = document.querySelector("#gameover-screen");
let musicNode = document.querySelector(".music-btn");
let effectsNode = document.querySelector(".effects-btn");
let restartNode = document.querySelector("#restart-btn");
let exitNode = document.querySelector("#exit-btn");
let scoreOverH1Node = document.querySelector(".score-end");
let livesNode = document.querySelector("#game-lives");
let livesImgNode = document.querySelectorAll("#game-lives img");
let livesH1Node = livesNode.querySelector("h1");
let bonusNode = document.querySelector("#game-bonus");
let bonusImgNode = document.querySelectorAll("#game-bonus img");
let bonusH1Node = bonusNode.querySelector("h1");
let gameObject;
let music = false;
let effects = false;

// Variables globales

// Funciones

// Recursion
const playMusic = (pathMusic, loop, sound) => {
  let audio = new Audio();
  if (sound) {
    audio.src = pathMusic;
    audio.volume = 0.05;
    audio.play().then(() => {
      return true;
    });
    audio.loop = loop;
  }
};

const startGame = () => {
  splashScreenNode.style.display = "none";
  gameOverNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  scoreNode.style.display = "flex";
  // Create a new game object
  gameObject = new Game();
  playMusic("../audio/audiogame.mp3", true, music);
  // Call gameLoop
  gameObject.gameLoop();
};

// Eventos
startBtnNode.addEventListener("click", startGame);
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp" || e.code === "KeyW") {
    if (gameObject.gameOn === true) gameObject.moveUp = true;
  } else if (e.code === "ArrowDown" || e.code === "KeyS") {
    if (gameObject.gameOn === true) gameObject.moveDown = true;
  } else if (e.code === "Space") {
    if (gameObject.gameOn === true) {
      e.preventDefault();
      gameObject.cannonBallSpawn(gameObject.tank.x, gameObject.tank.y);
    }
  } else if (e.code === "KeyQ") {
    gameObject.useExplosives = true;
    gameObject.effects = effectsNode.classList.contains("active")
      ? true
      : false;
    playMusic("../audio/beep.mp3", false, gameObject.effects);
  }
});
document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowUp" || e.code === "KeyW") {
    if (gameObject.gameOn === true) gameObject.moveUp = false;
  } else if (e.code === "ArrowDown" || e.code === "KeyS") {
    if (gameObject.gameOn === true) gameObject.moveDown = false;
  }
});
musicNode.addEventListener("click", () => {
  musicNode.classList.toggle("active");
  music = musicNode.classList.contains("active") ? true : false;
  musicNode.style.backgroundColor = musicNode.classList.contains("active")
    ? "#838180"
    : null;
});

effectsNode.addEventListener("click", () => {
  effectsNode.classList.toggle("active");
  effects = effectsNode.classList.contains("active") ? true : false;
  effectsNode.style.backgroundColor = effectsNode.classList.contains("active")
    ? "#838180"
    : null;
});

restartNode.addEventListener("click", () => {
  gameOverNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  scoreNode.style.display = "flex";
  gameObject.gameOn = true;
  requestAnimationFrame(gameObject.gameLoop);
});

exitNode.addEventListener("click", () => {
  gameOverNode.style.display = "none";
  splashScreenNode.style.display = "flex";
  gameObject.tank.node.remove();
});
