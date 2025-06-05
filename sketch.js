// Jardim Interativo das Emoções
// Projeto em P5.js
let flores = [];
let sons = {};
function preload() {
  // Sons devem ser adicionados ao projeto manualmente com nomes correspondentes
  soundFormats('mp3', 'ogg');
  sons['alegria'] = loadSound('sons/alegria.mp3');
  sons['tristeza'] = loadSound('sons/tristeza.mp3');
  sons['raiva'] = loadSound('sons/raiva.mp3');
  sons['calma'] = loadSound('sons/calma.mp3');
}
function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(14);
  flores.push(new Flor(200, 200, 'alegria', color(255, 215, 0)));
  flores.push(new Flor(400, 200, 'tristeza', color(100, 149, 237)));
  flores.push(new Flor(600, 200, 'raiva', color(220, 20, 60)));
  flores.push(new Flor(300, 400, 'calma', color(144, 238, 144)));
}
function draw() {
  background(240);

  for (let flor of flores) {
    flor.verificaHover(mouseX, mouseY);
    flor.mostrar();
  }
}
function mousePressed() {
  for (let flor of flores) {
    if (flor.hover && sons[flor.emocao]) {
      if (sons[flor.emocao].isPlaying()) {
        sons[flor.emocao].stop();
      }
      sons[flor.emocao].play();
    }
  }
}
class Flor {
  constructor(x, y, emocao, corBase) {
    this.x = x;
    this.y = y;
    this.emocao = emocao;
    this.cor = corBase;
    this.hover = false;
  }
  mostrar() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.hover ? lerpColor(this.cor, color(255), 0.4) : this.cor);

    // Desenha pétalas
    for (let i = 0; i < 8; i++) {
      ellipse(20 * cos(TWO_PI * i / 8), 20 * sin(TWO_PI * i / 8), 30, 50);
    }
    // Centro da flor
    fill(50);
    ellipse(0, 0, 30, 30);
    // Texto da emoção
    fill(0);
    text(this.emocao, 0, 60);
    pop();
  }
  verificaHover(mx, my) {
    this.hover = dist(mx, my, this.x, this.y) < 40;
  }
}