class Tank {
  constructor() {
    this.node = document.createElement("img");
    this.node.src = "../images/tank.png";
    gameBoxNode.append(this.node);

    // Tank dimensions
    this.width = 150;
    this.height = 90;
    this.x = 900;
    this.y = 350;
    this.tankSpeed = 1;

    // DOM adjustments
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.position = "absolute";
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }
  // Tank movement
  moveUp = () => {
    if (this.y >= -10) {
      this.y -= 10 * this.tankSpeed;
      if (this.y >= -10) this.node.style.top = `${this.y}px`;
    }
  };
  moveDown = () => {
    if (this.y <= 710) {
      this.y += 10 * this.tankSpeed;
      if (this.y <= 710) this.node.style.top = `${this.y}px`;
    }
  };
  getTankPosition = () => {
    return {
      x: this.x,
      y: this.y,
    };
  };
}
