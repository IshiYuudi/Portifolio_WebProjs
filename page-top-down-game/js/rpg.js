//Criando canvas
var canvas = document.getElementById("canvas");
//Definindo um contexto em 2D
var ctx = canvas.getContext("2d");
//Largura e Altura do Canvas
canvas.width = 760;
canvas.height = 380;
//Canvas � filho do BODY, ou seja, ser� criado dentro da tag BODY
//document.body.appendChild(canvas);

//Background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
    bgReady = true;
  };
bgImage.src = "./img/game-bg.png";

//Player
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
    heroReady = true;
  };
heroImage.src = "./img/player.png";

//Monster
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
    monsterReady = true;
  };
monsterImage.src = "./img/monster.png";

//Objetos do Jogo
var hero ={
  speed: 256
};
var monster ={};

//Quantidade de monstros capturados
var monsterCought = 0;
var monsterRemain = 5;
var timer = (monsterRemain * 2) + 2;
var level = 1;

//Controlando pelo teclado
var keysDown = {};

//Manipulador de evento do teclado, verifica o que est� acontecendo com o teclado
addEventListener("keydown", function (e){
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

//Resetando o Jogo
var reset = function (){
  //O player � criado no meio da tela (layout)
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;
  //Cria��o do monstro de forma rand�mica
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
}
//Controle de dire��es
var update = function (modifier){
  timer -= modifier;
  
  if (38 in keysDown && hero.y > 0){  //Up Key
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown && hero.y < (canvas.height - 32)){  //Down Key
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown && hero.x > 0){  //Right Key
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown && hero.x < (canvas.width - 32)){ //Left
    hero.x += hero.speed * modifier;
  }

  //Colis�o
  if(hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)){
    ++monsterCought;
    reset();
  }
  
  if(monsterCought >= monsterRemain) {
  	bgImage.src = "img/game-bg"+level+".png";
  	monsterCought = 0;
  	monsterRemain *= 2;
  	timer = (monsterRemain * 2) + 2;
  	level++;
  }

  if(timer <= 0) {
  	monsterCought = 0;
  	level = 1;
  	timer = 10;
  	reset();
  }    
};

//Desenhar na tela
var render = function (){
  if(bgReady){
    ctx.drawImage(bgImage, 0, 0);
  }
  if(heroReady){
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if(monsterReady){
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  //Placar
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "22px Verdana";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Capturados: " + monsterCought + " / " +monsterRemain, 8, 32);

  //Timer
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "22px Verdana";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Tempo: " + timer.toFixed(2), 8, 8);
};

//Loop do Jogo
var main = function() {
  //Retornar n�mero em milissegundos
  var now = Date.now();
  var delta = now - then;
  update(delta / 1000);
  render();
  then = now;
};

//Inicia o Jogo
reset();
var then = Date.now();
//O m�todo setInterval chama uma fun��o ou avalia uma express�o em intervalos espec�ficos (em milissegundos)
setInterval(main, 1);