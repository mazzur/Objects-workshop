var c;
c = document
  .querySelector('canvas');
var ctx = c
  .getContext(
    '2d'
  );
var cW = c.width
  = window
  .innerWidth;
var cH = c.height
  = window
  .innerHeight;

function random(a, b) {
  var random = Math.floor(Math.random()*(b-a))+a;
  return random;
}

// balls pool
var bp = new Array();
// count
var count = 15;

class GenericBall {
  constructor() {
  this.x = random(0
    + random(10, 20),
    cW - random(10, 20)
  );
  this.y = random(
    0 + random(10, 20), cH - random(10, 20)
  );
  this.vH = random(-7, 7);
  this.vY = random(-7, 7);
  this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
  this.size = random(10, 20);
  }


  draw() {
    ctx.beginPath();

    ctx.fillStyle = this.color;

    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);

    ctx.fill();
  }
  move() {
    this.vH = ((this.x + this.size) >= cW || (this.x - this.size) <= 0) ? -(this.vH)
      : this.vH;
    this.vY = (this.y + this.size) >= cH
|| (this.y - this.size) <= 0 ? -(this.vY) : this.vY;
    this.x = this.x + this.vH;
    this.y = this.y + this.vY;
  }


  update() {
    this.move()
  }
}

class ResizableBall extends GenericBall {
  constructor() {
    super();
  }
  resize() {
    this.size =
      random(0, 25);
  }
  update() {
  this
    .move();
  this
    .resize();
  }
}

while (bp.length < count) {
  ball = new GenericBall();
  bp.push(ball);
}

const crazyBall = new ResizableBall();
bp.push(crazyBall);

function moveBalls() {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, cW, cH);

  bp.forEach((item) => {
    item.draw();
    item.update();
  });

  requestAnimationFrame(moveBalls);
}

moveBalls();