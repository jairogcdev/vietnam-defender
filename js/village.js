class Village {
  constructor() {
    this.node = document.createElement("img");
    this.node.src = "images/flag.png";
    gameBoxNode.append(this.node);

    this.width = 150;
    this.height = 800;
    this.x = 1050;
    this.y = 0;

    // DOM adjustments
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.position = "absolute";
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }
}
