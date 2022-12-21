class blokje {
  constructor(n) {
      this.x = (windowWidth/8)*n;
      this.y = 0;
      this.hoogte = 200;
  }
  teken() {
      fill('black');
      stroke('white');
      rect(this.x,this.y-this.hoogte,windowWidth/8,this.hoogte);
  }
  val() {
      this.y += 5;
  }
  verdwijn() {
      if (this.y > windowHeight - 20 && this.y < windowHeight + 20 && ingedrukt[this.x/(windowWidth/8)] == 1) {
          blokjes.shift();
      }
      if (this.y > windowHeight + this.hoogte) {
          blokjes.shift();
      }
  }
  af() {
      if (this.y < windowHeight - 20 && ingedrukt[this.x/(windowWidth/8)] == 1) {
          actief = false;
      }
      if (this.y > windowHeight + 20 && ingedrukt[this.x/(windowWidth/8)] == 1) {
          actief = false;
      }
  }
}

class Raster {
  constructor(k) {
      this.aantalKolommen = k;
      this.celGrootte = null;
  }
  berekenCelGrootte() {
      this.celGrootte = windowWidth / this.aantalKolommen;
  }
  teken() {
      push();
      noFill();
      stroke('grey');
      for (var kolom = 0;kolom<this.aantalKolommen;kolom++) {
        rect(kolom*this.celGrootte,0,this.celGrootte,windowHeight - 200);
      }
      textSize(50);
      for (var kolom = 0;kolom<this.aantalKolommen;kolom++) {
          if (ingedrukt[kolom] == 1) {
              fill('red');
          }
          else {
              noFill();
          }
          rect(kolom*this.celGrootte,windowHeight - 200,this.celGrootte,200);
      }
      textSize(50);
      fill('black');
      for (var kolom = 0;kolom<this.aantalKolommen;kolom++) {
          text(letters[kolom],this.celGrootte*kolom+this.celGrootte/2-12.5,windowHeight-100);
      }
      pop();
  }
}

var blokjes = [];
var letters = ["a","s","d","f","j","k","l",";",];
var ingedrukt = [0,0,0,0,0,0,0,0];
var code = [65,83,68,70,74,75,76,186];
var actief = true;

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  raster = new Raster(8);
  frameRate(60);
}

function draw() {
  for (n = 0; n < letters.length; n++) {
      if (keyIsDown(code[n])) {
          ingedrukt[n] = 1;
      }
      else {
          ingedrukt[n] = 0;
      }
  }
  raster.berekenCelGrootte();
  background('white');
  raster.teken();
  if (frameCount % 40 == 0) {
      blokjes.push(new blokje(floor(random(0,8))));
  }
  for (n = 0; n < blokjes.length; n++) {
      blokjes[n].verdwijn();
      blokjes[n].teken();
      blokjes[n].val();
      blokjes[n].af();
  }
  if (actief == false) {
      noLoop();
  }
}