function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  textFont("Verdana");
  textSize(14);
  noStroke();
  //noLoop();
  background('lavender');  
  frameRate(1000);
}

function draw() {
  fill('wheat');
  rect(0,0,width,30);
  fill('black');  
  text("mouseX:" + round(mouseX) + " mouseY:"+round(mouseY),10,20);
  if (keyIsDown(32)) {
    fill('lavender');
    ellipse(mouseX,mouseY,20);
  }
  if (mouseIsPressed) {
    fill('indianred');
    ellipse(mouseX,mouseY,10);
  }
}
