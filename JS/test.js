function preload() {
  kever = loadImage("images/sprites/kever.png");
}

function setup() {
  canvas = createCanvas(500,450);
  background('silver');
  canvas.parent('processing');
  //noLoop();
}

function draw() {
  for(var n = 1; n <= 10 ; n++) {
    image(kever,-50 + 50 * n,0,50,50);
  }
}