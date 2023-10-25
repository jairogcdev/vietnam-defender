class CannonBall {
  constructor(positionX, positionY) {
    this.node = document.createElement("img");
    this.node.src = "../images/ammo.png";
    gameBoxNode.append(this.node);

    this.cannonBallX = positionX - 30;
    this.cannonBallY = positionY + 35;
    this.width = 30;
    this.height = 25;
    this.cannonBallSpeed = 1;
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.position = "absolute";
    this.node.style.left = `${this.cannonBallX}px`;
    this.node.style.top = `${this.cannonBallY}px`;
  }
  cannonMovement = (fps) => {
    // actualizar la posición en el DOM
    this.cannonBallX -= (this.cannonBallSpeed * 1000) / fps;
    this.node.style.left = `${this.cannonBallX}px`;
    if (this.cannonBallX <= -30) {
      this.cannonBallX -= (this.cannonBallSpeed * 1000) / fps;
      this.cannonBallX = 900;
      this.node.style.left = `${this.cannonBallX}px`;
    }
  };
}
