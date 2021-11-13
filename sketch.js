var PLAY=1;
var END=0;
var gameState=1;
var gameState="serve"
var back_img, bg;
var player,player_img;
var edges
var score=0
var logoimg
var ignd;
var start,startImg, start1,start1Img
var obstaclesGroup,obstacle
var fruit1_img, fruit2_img, fruit3_img, fruit4_img,fruit5_img,fruit6_img,fruit7_img
var gameOver, restart,gameOverImg,restartImg;
var wow, over;
function preload(){
  fruit1_img=loadImage("images/apple.png");
  fruit2_img=loadImage("images/banana.png")
  fruit3_img=loadImage("images/grapes.png")
  fruit4_img=loadImage("images/mango.png")
  fruit5_img=loadImage("images/melon2.png")
  fruit6_img=loadImage("images/orange2.png")
  fruit7_img=loadImage("images/pineapple.png")
  back_img=loadAnimation("images/select3-0.png","images/select3-1.png","images/select3-2.png","images/select3-3.png","images/select3-4.png","images/select3-5.png","images/select3-6.png","images/select3-7.png","images/select3-8.png","images/select3-9.png")
  player_img=loadImage("images/basket2.png")
  logoimg=loadImage("images/logo.jpg")
  startImg=loadImage("images/end2.png")
  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png")
  //start1Img=loadImage("images/startButton.png")
  wow = loadSound("images/wow.wav");
  over=loadSound("images/over.mp3");
}

function setup(){
  createCanvas(800, 500);
  bg=createSprite(400,250)
  bg.scale=1.2
  bg.addAnimation("animation", back_img)
  start=createSprite(150,250)
  start.scale=0.5
  start.addImage(startImg)
  start.visible = true
  player=createSprite(400,440,50,80)
  player.addImage(player_img)
  player.scale=1.2
  player.debug=false
  player.setCollider("rectangle",0,10,130,60)
  edges=createEdgeSprites()
  obstaclesGroup = createGroup();
  ignd=createSprite(100,490,1400,10)

  ignd.visible=false
  gameOver = createSprite(350,200);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(350,300);
  restart.addImage(restartImg);
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;
}
function draw(){
  background("black")
       drawSprites()
       if(keyDown("space")){
        start.visible = false
        gameState=PLAY;
    }

  if(gameState === PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
    if(keyDown(RIGHT_ARROW)){
      player.x=player.x+10
    }
    if(keyDown(LEFT_ARROW)){
      player.x=player.x-10
    }
    player.bounceOff(edges)
    spawnObstacles()
    if(obstaclesGroup.isTouching(player)){
            obstaclesGroup.destroyEach();
            score=score+1
            wow.play();
    
  }
  if(obstaclesGroup.isTouching(ignd)){
    gameState=END
    over.play();
  }
  }
  
   
  fill("white")
  textSize(35)
  textStyle(BOLD)
  text("Fruit catcher",220,60)
  text("Score  "+score, 600,60)
  textSize(30)
  fill("Red")
  image(logoimg,0,0,200,60)
  if(gameState==="serve"){
    textSize(20);
    fill("white");
    text("1.PRESS 'SPACE BAR' TO START",350,170);
    text("2.CONTROL BASKET WITH RIGHT AND LEFT ",350,210);
    text(" ARROWS",350,250);
    text("3.CATCH FRUITS TO GET MORE POINTS",350,300);
    text("GOOD LUCK",350,370);
}
   if (gameState === END) {
    start.visible = false
    gameOver.visible = true;
    restart.visible = true;
   
    obstaclesGroup.setLifetimeEach(-1);       
    obstaclesGroup.setVelocityYEach(0);
    obstaclesGroup.setVelocityXEach(0);
    player.x=400
    if(score<=20){
      textSize(30)
      textStyle(BOLD)
      fill("white")
      text("Try again to Score more "+score,150,360)
          }
    else {
      textSize(25)
      textStyle(BOLD)
      fill("white")
      text("Congratulations !!!!!!, Your score is  "+score,100,360)
    }
    if(mousePressedOver(restart)) {
      reset();
    }
     
  }
    
    
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
        var obstacle =createSprite(random(50, 750),40, 10, 10);
        obstacle.velocityY =(6+(score/10));
        
         //generate random obstacles
         var rand = Math.round(random(1,7));
         console.log(rand)
         switch(rand) {
           case 1: obstacle.addImage(fruit1_img);
                    obstacle.scale = 0.05;
                   break;
           case 2: obstacle.addImage(fruit2_img);
                    obstacle.scale = 0.05;
                   break;
           case 3: obstacle.addImage(fruit3_img);
                   obstacle.scale = 0.2;
                   break;
           case 4: obstacle.addImage(fruit4_img);
                   obstacle.scale = 0.04;
                   break;
           case 5: obstacle.addImage(fruit5_img);
                   obstacle.scale = 0.15;
                   break;
           case 6: obstacle.addImage(fruit6_img);
                   obstacle.scale = 0.04;
                   break;
            case 7: obstacle.addImage(fruit7_img);
                    obstacle.scale = 0.4;
            break;
           default: break;
         }
        
         //assign scale and lifetime to the obstacle           
         
         obstacle.lifetime = 150;
       
        //add each obstacle to the group
         obstaclesGroup.add(obstacle);
      }
     }
  function reset(){
      gameState = PLAY;
      gameOver.visible = false;
      restart.visible = false;
      
      obstaclesGroup.destroyEach();
         score = 0;
    }
    
    