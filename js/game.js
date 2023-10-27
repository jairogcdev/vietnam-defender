class Game {
  constructor() {
    // Tank
    this.tank = new Tank();

    // Village
    this.village = new Village();

    // cannonBalls
    this.cannonBallArr = [];

    // enemies
    this.enemiesArr = [];
    this.enemyCount = 1;

    // score
    this.score = 0;

    // timer
    this.timer = 0;

    // game over
    this.gameOn = true;

    // audio
    this.audio = new Audio();

    // // effects
    this.effects = false;

    // lives
    this.lives = 3;

    // movimiento 4d
    this.moveUp = false;
    this.moveDown = false;
    this.moveLeft = false;
    this.moveRight = false;

    // explosives
    this.explosives = 3;
    this.useExplosives = false;

    // highScore
    this.highScore = parseInt(localStorage.getItem("highScore")) || 0;
  }
  getFPS = () =>
    new Promise((resolve) =>
      requestAnimationFrame((t1) =>
        requestAnimationFrame((t2) => resolve(1000 / (t2 - t1)))
      )
    );
  spawnEnemies = () => {
    if (this.timer % 1440 === 0) {
      for (let i = 0; i < this.enemyCount; i++) {
        let enemy = new Enemies();
        this.enemiesArr.push(enemy);
      }
    }
  };
  enemiesMovement = () => {
    this.enemiesArr.forEach((enemy, index) => {
      enemy.automaticMovement();
      if (enemy.x > this.village.x) {
        if (this.explosives > 0 && this.useExplosives === true) {
          delete this.enemiesArr[index];
          enemy.node.src = "images/rocket-explosion.png";
          enemy.node.style.objectFit = "contain";
          if (this.effects) {
            this.audio.src = "audio/explosion.mp3";
            this.audio.volume = 0.05;
            this.audio.play().then(() => {
              return true;
            });
          }
          setTimeout(() => {
            enemy.node.remove();
          }, 3000);
          this.useExplosives = false;
          this.score += 1;
          scoreH1Node.innerText = `Score: ${this.score}`;
          this.explosives -= 1;
          bonusH1Node.innerText = `Mines: ${this.explosives}`;
          bonusImgNode[this.explosives].style.display = "none";
        } else {
          delete this.enemiesArr[index];
          setTimeout(() => {
            enemy.node.remove();
          }, 3000);
          if (this.effects) {
            this.audio.src = "audio/liveless.mp3";
            this.audio.volume = 0.4;
            this.audio.play().then(() => {
              return true;
            });
          }
          if (this.lives === 0) {
            this.gameOver();
          } else {
            this.lives -= 1;
            livesH1Node.innerText = `Lives: ${this.lives}`;
            livesImgNode[this.lives].style.display = "none";
          }
        }
      }
    });
  };
  cannonSound = () => {
    this.effects = effectsNode.classList.contains("active") ? true : false;
    if (this.effects) {
      this.audio.src = "audio/bang.mp3";
      this.audio.volume = 0.05;
      this.audio.play().then(() => {
        return true;
      });
    }
  };
  cannonBallSpawn = (x, y) => {
    let cannonBall = new CannonBall(x, y);
    this.cannonBallArr.push(cannonBall);
    this.cannonSound();
  };
  collisionCheckCannonBallEnemies = () => {
    this.enemiesArr.forEach((eachEnemy, indexEnemy) => {
      this.cannonBallArr.forEach((eachCannonBall, indexBall) => {
        if (
          eachEnemy.x < eachCannonBall.cannonBallX + eachCannonBall.width &&
          eachEnemy.x + eachEnemy.width > eachCannonBall.cannonBallX &&
          eachEnemy.y <
            eachCannonBall.cannonBallY +
              eachCannonBall.height -
              eachEnemy.height / 2 &&
          eachEnemy.y + eachCannonBall.height >
            eachCannonBall.cannonBallY - eachEnemy.height / 2
        ) {
          eachEnemy.node.src = "images/explosion.png";
          eachEnemy.node.style.objectFit = "contain";
          this.score += 1;
          scoreH1Node.innerText = `Score: ${this.score}`;
          eachCannonBall.node.remove();
          delete this.enemiesArr[indexEnemy];
          this.increaseDificulty();
          setTimeout(() => {
            eachEnemy.node.remove();
            if (this.effects) {
              this.audio.src = "audio/explosion.mp3";
              this.audio.volume = 0.05;
              this.audio.play().then(() => {
                return true;
              });
            }
          }, 100);
        }
      });
    });
  };
  cannonBallMovementCollisions = () => {
    this.cannonBallArr.forEach((cannonBall) => {
      if (cannonBall.cannonBallX >= 0) {
        this.getFPS().then((fps) => cannonBall.cannonMovement(fps));
      }
      this.collisionCheckCannonBallEnemies();
      gameObject.cannonBallDestroy();
      this.timer++;
    });
  };
  cannonBallDestroy = () => {
    this.cannonBallArr.forEach((cannonBall) => {
      if (cannonBall.cannonBallX < 0) {
        cannonBall.node.remove();
        this.cannonBallArr.shift();
      }
    });
  };
  increaseDificulty = () => {
    if (this.score / 10 >= this.enemyCount) {
      this.enemyCount += 1;
      this.tank.tankSpeed += 0.5;
      this.enemiesArr.forEach((eachEnemy) => {
        eachEnemy.increaseSpeed();
      });
    }
  };
  movement4D = () => {
    this.moveUp = false;
    this.moveDown = false;
    this.moveLeft = false;
    this.moveRight = false;
  };
  initialDefaultSettings = () => {
    this.enemyCount = 1;
    this.tank.tankSpeed = 1;
    this.lives = 3;
    this.explosives = 3;
    music = musicNode.classList.contains("active") ? true : false;
  };
  startingItemsValueStyles = () => {
    musicNode.classList.toggle("active");
    livesH1Node.innerText = `Lives: ${this.lives}`;
    bonusH1Node.innerText = `Mines: ${this.explosives}`;
    livesImgNode.forEach((eachImg) => (eachImg.style.display = "flex"));
    bonusImgNode.forEach((eachImg) => (eachImg.style.display = "flex"));
    scoreOverH1Node.innerText = `Score: ${this.score}`;
    this.tank.node.style.top = `${this.tank.y}px`;
  };
  setHighScore = () => {
    if (this.score.toString() > this.highScore) {
      localStorage.setItem("highScore", this.score.toString());
      this.highScore = parseInt(localStorage.getItem("highScore"));
    }
    scoreOverH3Node.innerText = `HighScore: ${this.highscore}`;

    this.score = 0;
    scoreH1Node.innerText = `Score: ${this.score}`;
  };
  setHighScoreScreen = () => {
    scoreOverH3Node.innerText = this.highScore
      ? `HighScore: ` + localStorage.getItem("highScore")
      : `HighScore: ` + 0;
  };
  deleteEmemiesArray = () => {
    this.enemiesArr.forEach((eachEnemy, index) => {
      eachEnemy.node.remove();
      delete this.enemiesArr[index];
    });
  };
  enemiesDefaultSpeed = () => {
    this.enemiesArr.forEach((eachEnemy) => {
      eachEnemy.speed = 0.66;
    });
  };
  deleteCannonBallsArray = () => {
    this.cannonBallArr.forEach((eachCannonBall, index) => {
      eachCannonBall.node.remove();
      delete this.cannonBallArr[index];
    });
  };
  actionMovement4D = () => {
    if (this.moveUp === true) {
      this.getFPS().then((fps) => this.tank.moveUp(fps));
    } else if (this.moveDown === true) {
      this.getFPS().then((fps) => this.tank.moveDown(fps));
    } else if (this.moveLeft === true) {
      this.getFPS().then((fps) => this.tank.moveLeft(fps));
    } else if (this.moveRight === true) {
      this.getFPS().then((fps) => this.tank.moveRight(fps));
    }
  };
  playMusic = (pathMusic, loop, sound) => {
    if (sound) {
      this.audio.src = pathMusic;
      this.audio.volume = 0.05;
      this.audio.play().then(() => {
        return true;
      });
      this.audio.loop = loop;
    }
  };
  checkSoundButtons = () => {
    if (music === false) {
      inGameMusicNode.style.display = "none";
    }
    if (effects === false) {
      inGameEffectsNode.style.display = "none";
    }
  };
  gameStatus = (gameOn) => {
    if (gameOn === true) requestAnimationFrame(this.gameLoop);
    if (gameOn === false) {
      gameOverNode.style.display = "flex";
      gameScreenNode.style.display = "none";
    }
  };
  gameOver = () => {
    this.gameOn = false;
    this.initialDefaultSettings();
    this.movement4D();
    this.startingItemsValueStyles();
    this.enemiesDefaultSpeed();
    this.setHighScore();
    this.deleteEmemiesArray();
    this.deleteCannonBallsArray();
  };
  // Start gameLoop
  gameLoop = () => {
    this.actionMovement4D();
    this.checkSoundButtons();
    this.setHighScoreScreen();
    this.spawnEnemies();
    this.enemiesMovement();
    this.cannonBallMovementCollisions();
    this.timer++;
    this.gameStatus(this.gameOn);
  };
}
// Event
inGameEffectsNode.addEventListener("click", () => {
  inGameEffectsNode.classList.toggle("active");
  gameObject.audio.muted = gameObject.audio.muted ? false : true;
  inGameEffectsImgNode.src = gameObject.audio.muted
    ? "images/effects-mute.png"
    : "images/effects.png";
});
