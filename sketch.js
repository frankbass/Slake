let img;
// let p;
let scale;
let ratio = 400;
let sample;
let samples = [];
let frameSize = 10; //size of sampled frame in image
function preload() {
  img = loadImage("e small.jpg");
  // img.resize(400, 400);
}

function setup() {
  createCanvas(800, 400);
  scale = img.height / height;
  image(img, 0, 0, width / 2, height);
  samples[0] = new Sample(400, 0);
  samples[1] = new Sample(400, 200);
  samples[2] = new Sample(600, 0);
  samples[3] = new Sample(600, 200);
}

function draw() {
  image(img, 0, 0, width / 2, height);
  noStroke();
  fill(255);
  rect(400, 0, 400, 400);
  samples[0].update();
  samples[0].drawing();
  for (let i = 0; i < 4; i++) {
    samples[i].update();
    samples[i].drawing();
  }
  // let n = img.get(mouseX*scale, mouseY*scale, frameSize*scale, frameSize*scale);
  // image(img, 0,0, width /2, height);
  // image(n, 400, 0, 200, 200);
  // stroke(0);
  // noFill();
  // rect(mouseX, mouseY, frameSize, frameSize);
  // console.log(mouseX);

}


class Sample {
  constructor(x, y) {
    this.p = createVector(random(img.width - frameSize), random(img.height - frameSize));
    this.nextP;
    this.changeUnit = (int(random(9)) + 2) / 10;
    this.xChange = 1;
    this.yChange = 1;
    this.n = img.get(this.p.x, this.p.y, frameSize, frameSize);
    this.x = x;
    this.y = y;
    this.reset();
  }
  reset() {
    this.nextP = createVector(random(img.width - frameSize), random(img.height - frameSize));
    if (this.p.x > this.nextP.x) {
      this.xChange = -1;
    } else {
      this.xChange = 1;
    }
    this.xChange *= this.changeUnit;
    if (this.p.y > this.nextP.y) {
      this.yChange = -1;
    } else {
      this.yChange = 1;
    }
    this.yChange *= this.changeUnit;
  }
  update() {
    if (abs(this.p.x - this.nextP.x) > 10) {
      this.p.x += this.xChange;
    }
    this.p.x = constrain(this.p.x, 0, img.width - frameSize);
    if (abs(this.p.y - this.nextP.y) > 10) {
      this.p.y += this.yChange;
    }
    this.p.y = constrain(this.p.y, 0, img.height - frameSize);

    if ((abs(this.p.x - this.nextP.x) <= 20) && (abs(this.p.y - this.nextP.y) <= 10)) {
      this.reset();
    }
    this.n = img.get(this.p.x, this.p.y, frameSize, frameSize);
  }
  drawing() {
    image(this.n, this.x, this.y, 200, 200);
    noFill();
    stroke(0);
    rect(this.p.x / scale, this.p.y / scale, frameSize, frameSize);
  }
}
