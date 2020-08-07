var canvas, backgroundImage;

//gameState and other values defined
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

//var for classes made
var form, player, game;

//car and car image variable
var cars, car1, car2, car3, car4;
var c1,c2,c3,c4,track;


function preload(){
  //images got preloaded
c1=loadImage("images/car1.png");
c2=loadImage("images/car2.png");
c3=loadImage("images/car3.png");
c4=loadImage("images/car4.png");
track=loadImage("images/track.jpg");
}

function setup(){
  //canvas defined with displayWidth and displayHeight
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
 
  //database defined
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  //actions as per playerCount and gameState defined
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
}
