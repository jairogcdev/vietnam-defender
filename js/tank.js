class Tank {
  constructor() {
    this.node = document.createElement("img");
    this.node.src = "images/tank.png";
    gameBoxNode.append(this.node);

    // Tank dimensions
    this.width = 150;
    this.height = 90;
    this.x = 900;
    this.y = 332;
    this.tankSpeed = 1;
    this.isMovingUp = false;
    this.isMovingDown = false;

    // DOM adjustments
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.position = "absolute";
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }
  // Tank movement
  moveUp = (fps) => {
    if (this.y >= 0) {
      this.y -= (this.tankSpeed * fps) / fps;
      if (this.y >= 0) this.node.style.top = `${this.y}px`;
    }
  };
  moveDown = (fps) => {
    if (this.y <= 662) {
      this.y += (this.tankSpeed * fps) / fps;
      if (this.y <= 662) this.node.style.top = `${this.y}px`;
    }
  };
  getTankPosition = () => {
    return {
      x: this.x,
      y: this.y,
    };
  };
}
