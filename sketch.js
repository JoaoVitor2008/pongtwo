// variáveis da bolinha
let xBolinha = 650;
let yBolinha = 200;
let diâmetro = 20;
let raio = diâmetro / 2;

// velocidade da bolinha
let velocidadexBolinha = 4;
let velocidadeyBolinha = 4;
let raqueteComprimento = 7;
let raqueteAltura = 70;

// variáveis da raquete
let xRaquete = 10;
let yRaquete = 150;

// variáveis do oponente
let xRaqueteOponente = 1430;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

// placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(1600, 400);
  trilha.loop();
}

function draw() {
  background("Pink");
  mostraBolinha();
  movimentaBolinha();
  colisãoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  // colisãoRaquete();
  colisãoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisãoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diâmetro);
}

function movimentaBolinha() {
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function colisãoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadexBolinha *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeyBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete() {
  if (keyIsDown(UP_ARROW) && yRaquete > 0) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW) && yRaquete + raqueteAltura < height) {
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente() {
  if (keyIsDown(87) && yRaqueteOponente > 0) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83) && yRaqueteOponente + raqueteAltura < height) {
    yRaqueteOponente += 10;
  }
}

function colisãoRaquete(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(130, 14, 40, 20);
  fill(255);
  text(meusPontos, 150, 30);
  fill(color(255, 140, 0));
  rect(1150, 14, 40, 20);
  fill(255);
  text(pontosDoOponente, 1170, 30);
}

function marcaPonto() {
  if (xBolinha > width) {
    meusPontos += 1;
    ponto.play();
    reiniciaJogo();
  }
  if (xBolinha < 0) {
    pontosDoOponente += 1;
    ponto.play();
    reiniciaJogo();
  }
}

function reiniciaJogo() {
  xBolinha = width / 2;
  yBolinha = height / 2;
  velocidadexBolinha *= -1;
  velocidadeyBolinha *= random([-1, 1]);
}
