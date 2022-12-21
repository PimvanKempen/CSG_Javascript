class piano {
    constructor() {
        this.actief = false;
        this.afgelopen = null;
        this.score = null;
        this.highScore = 0;
        this.blokjesArray = [];
        this.letters = ["a","s","d","f","j","k","l",";",];
        this.ingedrukt = [0,0,0,0,0,0,0,0];
        this.code = [65,83,68,70,74,75,76,186];
        this.celGrootte = null;
        this.aantalKolommen = 8;
        this.snelheid = 40; // Hoe lager dit getal, hoe sneller het spel gaat
        this.scoreVerschil = null;
    }

    nieuwSpel() {
        this.afgelopen = false;
        this.score = 0;
    }

    teken() {
        if (!this.actief) {
            this.beginScherm();
        }
        else {
            if (this.afgelopen) {
                this.eindScherm();
            }
            else {
                this.celGrootte = windowWidth / this.aantalKolommen;
                push();
                background('white');
                noFill();
                stroke('grey');
                for (var kolom = 0; kolom<this.aantalKolommen; kolom++) {
                    rect(kolom*this.celGrootte,0,this.celGrootte,windowHeight - 200);
                }
                textSize(50);
                for (var kolom = 0; kolom<this.aantalKolommen; kolom++) {
                    if (this.ingedrukt[kolom] == 1) {
                        fill('grey');
                    }
                    else {
                        noFill();
                    }
                    rect(kolom*this.celGrootte,windowHeight - 200,this.celGrootte,200);
                }
                fill('black');
                for (var kolom = 0;kolom<this.aantalKolommen;kolom++) {
                    text(this.letters[kolom],this.celGrootte*kolom+this.celGrootte/2-12.5,windowHeight-100);
                }
                fill('grey');
                textSize(30);
                text("Score: "+this.score+"\n+ "+this.scoreVerschil,10,50);
                pop();
            }
        }
    }

    update() {
        if (this.actief && !this.afgelopen) {
            if (frameCount % this.snelheid == 0) {
                this.blokjesArray.push(new blokjes(floor(random(0,8))));
            }
        }
        for (var n = 0; n < this.letters.length; n++) {
            if (keyIsDown(this.code[n])) {
                this.ingedrukt[n] = 1;
            }
            else {
                this.ingedrukt[n] = 0;
            }
        }
        for (n = 0; n < spel.blokjesArray.length; n++) {
            spel.blokjesArray[n].snelheid = spel.blokjesArray[n].hoogte/this.snelheid;
        }
    }

    beginScherm() {
        push();
        background("white");
        textSize(50);
        text("druk op ENTER om te beginnen", 150,windowHeight/2);
        pop();
    }

    eindScherm() {
        this.blokjesArray = [];
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
        push();
        background("white");
        textSize(50);
        text("Je bent AF,\ndruk op ENTER om een nieuw spel te starten\nScore: "+this.score+"\nHighscore: "+this.highScore, 150,200);
        pop();
    }
}

class blokjes {
    constructor(x) {
        this.x = x*spel.celGrootte;
        this.y = -200;
        this.letter = x;
        this.hoogte = 200;
        this.snelheid = null;
        this.score = null;
    }

    teken() {
        push();
        stroke('white');
        fill('black');
        rect(this.x,this.y,spel.celGrootte,this.hoogte);
        pop();
    }

    update() {
        this.y += this.snelheid;
        if (this.y > windowHeight-250 && this.y < windowHeight-150) {
            if (spel.ingedrukt[this.letter] == 1) {
                spel.blokjesArray.shift();
                spel.scoreVerschil = floor((50 - Math.abs(windowHeight - 200 - this.y)) / 10) + 1;
                spel.score += spel.scoreVerschil;
            }
            for (var n = 0; n < spel.ingedrukt.length; n++) {
                if (n != this.letter) {
                    if (spel.ingedrukt[n] == 1) {
                        spel.afgelopen = true;
                    }
                }
            }
        }
        if (this.y > windowHeight-150) {
            spel.afgelopen = true;
        }
    }
}

function preload() {

}

function setup() {
    canvas = createCanvas(windowWidth,windowHeight);
    spel = new piano();
    frameRate(60);
}

function draw() {
    spel.update();
    spel.teken();
    for (n = 0; n < spel.blokjesArray.length; n++) {
        spel.blokjesArray[n].update();
        spel.blokjesArray[n].teken();
    }
}

function keyPressed() {
    if (keyCode == ENTER) {
        if (!spel.actief) {
            spel.actief = true;
            spel.nieuwSpel();
        }
        if (spel.afgelopen) {
            spel.nieuwSpel();
        }
    }
}