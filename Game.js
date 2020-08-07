class Game {
  constructor(){

  }
//function referring to gameState
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  //updating state of game
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  //start of the game
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    //players made
    car1 = createSprite(100,200);
    car1.addImage(c1);
    car2 = createSprite(300,200);
    car2.addImage(c2);
    car3 = createSprite(500,200);
    car3.addImage(c3);
    car4 = createSprite(700,200);
    car4.addImage(c4);
    cars = [car1, car2, car3, car4];
    
  }

  //play state
  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(120,60,50));
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          //made circles for player's cars
          fill("blue");
          ellipse(x,y,80,80);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    //function defined of how the player will move
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
if(player.distance>3500){
  gameState=2;
}


    drawSprites();
  }
  //end of the game
  end(){
    game.update(2);
  }
}
