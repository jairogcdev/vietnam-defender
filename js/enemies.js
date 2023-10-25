class Enemies {
  constructor() {
    this.node = document.createElement("img");
    this.node.src = "../images/enemy-tank.png";
    gameBoxNode.append(this.node);
    this.enemyCount = 0;
    this.enemySpeed = 100;
    this.enemySpeedMax = 100;
    this.enemySpeedMin = 100;
    this.enemySpeedInc = 100;
    this.enemySpeedDec = 100;

    // enemies dimensions
    this.width = 150;
    this.height = 90;
    this.x = 0;
    this.y =
      Math.random() > 0.5
        ? 350 + Math.random() * 370
        : 350 - Math.random() * 370;
    this.speed = 0.66;

    // DOM adjustments
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.position = "absolute";
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }
  automaticMovement = () => {
    this.x += this.speed;
    this.node.style.left = `${this.x}px`;
  };
  addEnemy(enemy) {
    this.enemies.push(enemy);
    this.enemyCount++;
  }
  removeEnemy(enemy) {
    this.enemies.splice(this.enemies.indexOf(enemy), 1);
    this.enemyCount--;
  }
  increaseSpeed = () => {
    this.speed += 0.1;
  };
}
