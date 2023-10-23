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
  cannonBallSpawn = () => {
    let cannonBall = new CannonBall(this.tank.x, this.tank.y);
    this.cannonBallArr.push(cannonBall);
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
          this.score += 1;
          scoreH1Node.innerText = `Score: ${this.score}`;
          this.increaseDificulty();
          this.enemiesArr[indexEnemy].node.remove();
          delete this.enemiesArr[indexEnemy];
          this.cannonBallArr[indexBall].node.remove();
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
    console.log("GAME OVER");
    this.gameOn = false;
    this.score = 0;
    this.enemyCount = 1;
    this.tank.tankSpeed = 1;
    this.enemiesArr.forEach((eachEnemy) => {
      eachEnemy.speed = 0.66;
    });
    scoreH1Node.innerText = `Score: ${this.score}`;
    this.enemiesArr.forEach((eachEnemy, index) => {
      eachEnemy.node.remove();
      delete this.enemiesArr[index];
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
      if (confirm("Fin de la partida! Quieres volver a jugar")) {
        this.gameOn = true;
        requestAnimationFrame(this.gameLoop);
      }
    }
  };
}
