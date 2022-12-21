var aantalRijenRaster = 6;
var aantalKolommenRaster = 9;
var celGrootte;

var spriteJos;
var xJos;
var yJos;

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  spriteJos = loadImage("images/sprites/Jos100px/Jos_0.png");
}

function setup() {
  canvas = createCanvas(901,601);
  canvas.parent('processing');
  celGrootte = width / aantalKolommenRaster;
}

function draw() {
  image(brug,0,0,width,height);
  if (keyIsDown(RIGHT_ARROW)) {
    aantalKolommenRaster++;
  }
  if (keyIsDown(LEFT_ARROW)) {
    aantalKolommenRaster--;
  }
  if (keyIsDown(UP_ARROW)) {
    aantalRijenRaster++;
  }
  if (keyIsDown(DOWN_ARROW)) {
    aantalRijenRaster--;
  }
  celGrootte = width / aantalKolommenRaster;
  tekenRaster();
  var xJos = 4*celGrootte;
  var yJos = 3*celGrootte;
  image(spriteJos,xJos,yJos);
}

function tekenRaster() {
  push();
  noFill();
  stroke('grey');
  for (var n = 1; n <= aantalKolommenRaster ; n++) {
    for (var i = 1; i <= aantalRijenRaster ; i++) {
      rect((n-1)*celGrootte,(i-1)*celGrootte,celGrootte,celGrootte);
    }
  }
  pop();
}