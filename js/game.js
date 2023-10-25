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

    // // music
    // this.music = false;

    // // effects
    this.effects = false;
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
    this.enemiesArr.forEach((enemy) => {
      enemy.automaticMovement();
      if (enemy.x > this.tank.x + this.tank.width) {
        this.gameOver();
      }
    });
  };
  cannonSound = () => {
    this.effects = effectsNode.classList.contains("active") ? true : false;
    console.log(this.effects);

    if (this.effects) {
      this.audio.src = "../audio/bang.mp3";
      this.audio.volume = 0.5;
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
          eachEnemy.node.src = "../images/explosion.png";
          this.score += 1;
          scoreH1Node.innerText = `Score: ${this.score}`;
          eachCannonBall.node.remove();
          delete this.enemiesArr[indexEnemy];
          this.increaseDificulty();
          setTimeout(() => {
            eachEnemy.node.remove();
          }, 400);
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
      this.tank.tankSpeed += 1;
      this.enemiesArr.forEach((eachEnemy) => {
        eachEnemy.increaseSpeed();
      });
    }
  };
  gameOver = () => {
    this.gameOn = false;
    this.enemyCount = 1;
    this.tank.tankSpeed = 1;
    this.enemiesArr.forEach((eachEnemy) => {
      eachEnemy.speed = 0.66;
    });
    scoreOverH1Node.innerText = `Score: ${this.score}`;
    this.score = 0;
    scoreH1Node.innerText = `Score: ${this.score}`;

    this.enemiesArr.forEach((eachEnemy, index) => {
      eachEnemy.node.remove();
      delete this.enemiesArr[index];
    });
    this.cannonBallArr.forEach((eachCannonBall, index) => {
      eachCannonBall.node.remove();
      delete this.cannonBallArr[index];
    });
  };
  // Start gameLoop
  gameLoop = () => {
    this.spawnEnemies();
    this.enemiesMovement();
    this.cannonBallMovementCollisions();
    this.timer++;
    if (this.gameOn === true) requestAnimationFrame(this.gameLoop);
    if (gameObject.gameOn === false) {
      gameOverNode.style.display = "flex";
      gameScreenNode.style.display = "none";
    }
  };
}
