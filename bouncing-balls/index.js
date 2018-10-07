const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const canvasWidth = canvas.width = window.innerWidth;
const canvasHeight = canvas.height = window.innerHeight;

const ball = {
  x: 50,
  y: 50,
  velocityX: 7,
  velocityY: 7,
  color: 'rgb(59,89,152)',
  size: 15,
  draw() {
    canvasContext.beginPath();
    canvasContext.fillStyle = this.color;
    canvasContext.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    canvasContext.fill();
  },
  update() {
    const intersectVerticalBorder = (this.x + this.size) >= canvasWidth
      || (this.x - this.size) <= 0;
    const intersectHorizontalBorder = (this.y + this.size) >= canvasHeight
      || (this.y - this.size) <= 0;

    if (intersectVerticalBorder) {
      this.velocityX = -(this.velocityX);
    }

    if (intersectHorizontalBorder) {
      this.velocityY = -(this.velocityY);
    }

    this.x = this.x + this.velocityX;
    this.y = this.y + this.velocityY;
  },
};

function moveBall() {
  canvasContext.fillStyle = 'rgba(0,0,0,0.2)';
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

  ball.draw();
  ball.update();

  requestAnimationFrame(moveBall);
}

moveBall();