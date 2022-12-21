var foto;
var pixelKleur;
var rood,groen,blauw;
var aantalKolommenRaster = 18;
var aantalRijenRaster;
var celGrootte;

function preload() {
  foto = loadImage("images/brieck_klein.jpg");
}

function setup() {
  canvas = createCanvas(450,450);

  canvas.parent('processing');
  textFont("Georgia");
  textSize(18);
  noStroke();
  foto.loadPixels();
}

function draw() {
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
  aantalRijenRaster = aantalKolommenRaster;
  background(foto);
  for (var rij = 0;rij < aantalRijenRaster;rij++) {
    for (var kolom = 0;kolom < aantalKolommenRaster;kolom++) {
      pixelKleur = foto.get(kolom*celGrootte,rij*celGrootte);
      fill(pixelKleur);
      rect(kolom*celGrootte,rij*celGrootte,celGrootte,celGrootte);
    }
  }
}