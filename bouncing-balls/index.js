// canvas
const c = document.querySelector('canvas');
// canvas context
const cc = c.getContext('2d');
var cW = c.width = window.innerWidth;
var cH = c.height = window.innerHeight;

function random(a, b) {
  var random = Math.floor(Math.random() * (b - a)) + a;
  return random;
}

// contains balls
const bp = [];
const maxV = 7;
while (bp.length < 15) {
  size = random(10, 20);
  const ball = {
    x: random(0 + size, cW - size),
    y: random(0 + size, cH - size),
    vX: random(-maxV, maxV),
    vY: random(-maxV, maxV),
    color: 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    size: size,
    move() {
      cc.beginPath();
      cc.fillStyle = this.color;
      cc.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      cc.fill();
      this.vX = ((this.x + this.size) >= cW || (this.x - this.size) <= 0) ? -(this.vX)
        : this.vX;
      this.vY = (this.y + this.size) >= cH
      || (this.y - this.size) <= 0 ? -(this.vY) : this.vY;
      this.x = this.x + this.vX;
      this.y = this.y + this.vY;
    },
  };
  bp.push(ball);
}

const resizableBall = {
  x: random(0 + random(10, 20), cW - random(10, 20)),
  y: random(0 + random(10, 20), cH - random(10, 20)),
  velocityX: random(-maxV, maxV),
  velocityY: random(-maxV, maxV),
  color: 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
  size: random(10, 20),
  move() {
    cc.beginPath();
    cc.fillStyle = this.color;
    cc.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    cc.fill();
    const intersectVerticalBorder = (this.x + this.size) >= cW
      || (this.x - this.size) <= 0;
    const intersectHorizontalBorder = (this.y + this.size) >= cH
      || (this.y - this.size) <= 0;

    if (intersectVerticalBorder) {
      this.velocityX = -(this.velocityX);
    }

    if (intersectHorizontalBorder) {
      this.velocityY = -(this.velocityY);
    }

    this.x = this.x + this.velocityX;
    this.y = this.y + this.velocityY;

    this.size = random(0, 25);
  },
};

bp.push(resizableBall);

function run() {
  cc.fillStyle = 'rgba(0,0,0,0.2)';
  cc.fillRect(0, 0, cW, cH);

  bp.forEach((b) => {
    b.move();
  });

  requestAnimationFrame(run);
}

run();