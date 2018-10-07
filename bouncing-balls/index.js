const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const canvasWidth = canvas.width = window.innerWidth;
const canvasHeight = canvas.height = window.innerHeight;

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const maxVelocity = 7;
const ballSize = generateRandomNumber(10, 20);

const ball = {
  x: generateRandomNumber(0 + ballSize, canvasWidth - ballSize),
  y: generateRandomNumber(0 + ballSize, canvasHeight - ballSize),
  velocityX: generateRandomNumber(-maxVelocity, maxVelocity),
  velocityY: generateRandomNumber(-maxVelocity, maxVelocity),
  color: 'rgb(' + generateRandomNumber(0, 255) + ',' + generateRandomNumber(0, 255) + ',' + generateRandomNumber(0, 255) + ')',
  size: ballSize,
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