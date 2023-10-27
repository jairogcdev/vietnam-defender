class Enemies {
  constructor() {
    this.node = document.createElement("img");
    this.node.src = "images/enemy-tank.png";
    gameBoxNode.append(this.node);
    this.enemyCount = 0;
    this.enemySpeed = 100;

    // enemies dimensions
    this.width = 150;
    this.height = 90;
    this.x =
      Math.random() > 0.5
        ? -100 + Math.random() * 100
        : -300 - Math.random() * 300;
    this.y =
      Math.random() > 0.5
        ? 322 + Math.random() * 338
        : 322 - Math.random() * 322;
    this.speed = 0.66;

    // DOM adjustments
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.position = "absolute";
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }
  getSpeed(fps) {
    let speed;
    if (fps > 200) {
      speed = fps;
    } else if (fps < 200 && fps > 110) {
      speed = fps * 2;
    } else {
      speed = fps * 4;
    }
    return speed;
  }
  automaticMovement = (fps) => {
    let speed = this.getSpeed(fps);
    this.x += (this.speed * speed) / fps;
    this.node.style.left = `${this.x}px`;
  };
  enemyStop = (x) => {
    this.x = x;
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
