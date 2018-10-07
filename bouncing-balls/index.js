const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const canvasWidth = canvas.width = window.innerWidth;
const canvasHeight = canvas.height = window.innerHeight;

const ball = {
  x: 50,
  y: 50,
  velocityX: 25,
  velocityY: 25,
  color: 'rgb(59,89,152)',
  size: 15,
  draw() {
    canvasContext.beginPath();
    canvasContext.fillStyle = this.color;
    canvasContext.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    canvasContext.fill();
  }
};

canvasContext.fillStyle = 'rgba(0,0,0,0.2)';
canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

ball.draw();