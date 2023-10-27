class Mine {
  constructor(y) {
    this.node = document.createElement("img");
    this.node.src = "images/mine.png";
    gameBoxNode.append(this.node);
    this.width = 20;
    this.height = 20;
    this.x = 1110;
    this.y = y;

    // DOM adjustments
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.position = "absolute";
    this.node.style.backgroundRepeat = "repeat";
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }
}
