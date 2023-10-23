// Vietnam Defender

// Elementos de DOM
let startBtnNode = document.querySelector("#start-btn");
let splashScreenNode = document.querySelector("#splash-screen");
let gameScreenNode = document.querySelector("#game-screen");
let gameBoxNode = document.querySelector("#game-box");
let cannonBallNode = document.querySelector("#cannonBall");
let scoreNode = document.querySelector("#game-score");
let scoreH1Node = scoreNode.querySelector("h1");
let gameObject;

// Variables globales

// Funciones

// Recursion
const startGame = () => {
  splashScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  scoreNode.style.display = "flex";
  // Create a new game object
  gameObject = new Game();
  // Call gameLoop
  gameObject.gameLoop();
};

// Eventos
startBtnNode.addEventListener("click", startGame);
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp" || e.code === "KeyW") {
    if (gameObject.gameOn === true) gameObject.tank.moveUp();
  } else if (e.code === "ArrowDown" || e.code === "KeyS") {
    if (gameObject.gameOn === true) gameObject.tank.moveDown();
  } else if (e.code === "Space") {
    if (gameObject.gameOn === true) gameObject.cannonBallSpawn();
  }
});
