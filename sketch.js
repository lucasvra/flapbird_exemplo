var xPassaro;
var yPassaro;
var tamanhoPassaro = 32;
var gravidade = 0.6;
var impulso = -10;
var velocidade = 0;

var larguraCano = 80;
var espacamentoCano = 200;
var xCano;
var yCano;

var pontuacao = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  xPassaro = 64;
  yPassaro = height / 2;
  xCano = width;
  yCano = random(height / 2);
}

function draw() {
  background(135, 206, 250);
  atualizarFisicaPassaro();     
  desenharPassaro(xPassaro, yPassaro);
  desenharCanos();
  moverCanos();
  verificarColisoes();
  mostrarPontuacao();
}

function desenharPassaro(x, y) {
  fill(255, 204, 0);
  ellipse(x, y, tamanhoPassaro, tamanhoPassaro);
}

function atualizarFisicaPassaro() {
  velocidade += gravidade;
  yPassaro += velocidade;

  if (yPassaro > height) {
    yPassaro = height;
    velocidade = 0;
  }
  if (yPassaro < 0) {
    yPassaro = 0;
    velocidade = 0;
  }
}

function desenharCanos() {
  fill(34, 139, 34);
  rect(xCano, 0, larguraCano, yCano);
  rect(xCano, yCano + espacamentoCano, larguraCano, height - yCano - espacamentoCano);
}

function moverCanos() {
  xCano -= 6;
  if (xCano < -larguraCano) {
    xCano = width;
    yCano = random(height / 2);
    pontuacao++;
  }
}

function verificarColisoes() {
  if (xPassaro + tamanhoPassaro / 2 > xCano && xPassaro - tamanhoPassaro / 2 < xCano + larguraCano) {
    if (yPassaro - tamanhoPassaro / 2 < yCano || yPassaro + tamanhoPassaro / 2 > yCano + espacamentoCano) {
      noLoop();
      console.log("Game Over! Pontuação Final: " + pontuacao);
    }
  }
}

function mostrarPontuacao() {
  fill(0);
  textSize(32);
  text("Pontuação: " + pontuacao, 10, 30);
}

function keyPressed() {
  if (key == ' ') {
    velocidade += impulso;
  } else if (key == 'r') {
    reiniciar();
  }
}

function mousePressed() {
  velocidade += impulso;
}

function reiniciar() {
  yPassaro = height / 2;
  xCano = width;
  yCano = random(height / 2);
  pontuacao = 0;
  loop();
}
