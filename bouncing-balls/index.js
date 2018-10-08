const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const canvasWidth = canvas.width = window.innerWidth;
const canvasHeight = canvas.height = window.innerHeight;

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const ballsPool = [];
const ballsCount = 15;
const maxVelocity = 7;

const genericBall = {
  initialize() {
    const ballSize = generateRandomNumber(10, 20);

    this.x = generateRandomNumber(0 + ballSize, canvasWidth - ballSize);
    this.y = generateRandomNumber(0 + ballSize, canvasHeight - ballSize);
    this.velocityX = generateRandomNumber(-maxVelocity, maxVelocity);
    this.velocityY = generateRandomNumber(-maxVelocity, maxVelocity);
    this.color = 'rgb(' + generateRandomNumber(0, 255) + ',' + generateRandomNumber(0, 255) + ',' + generateRandomNumber(0, 255) + ')';
    this.size = ballSize;
  },
  draw() {
    canvasContext.beginPath();
    canvasContext.fillStyle = this.color;
    canvasContext.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    canvasContext.fill();
  },
  move() {
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
  update() {
    this.move();
  },
};

const resizableBall = Object.assign(Object.create(genericBall), {
  resize() {
    this.size = generateRandomNumber(0, 25);
  },
  update() {
    this.move();
    this.resize();
  }
});

while (ballsPool.length < ballsCount) {
  const ball = Object.create(genericBall);
  ball.initialize();
  ballsPool.push(ball);
}

const crazyBall = Object.create(resizableBall);
crazyBall.initialize();
ballsPool.push(crazyBall);

function moveBalls() {
  canvasContext.fillStyle = 'rgba(0,0,0,0.2)';
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

  ballsPool.forEach((ball) => {
    ball.draw();
    ball.update();
  });

  requestAnimationFrame(moveBalls);
}

moveBalls();