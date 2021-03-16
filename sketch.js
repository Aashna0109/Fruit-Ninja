var PLAY=1;
var END=0;
var gameState=1;

var knife,knifeImage ;
var wood,woodImage;
var fruit1,fruit2,fruit3,fruit4,fruitGroup,cuttingSound;
var bomb,bombImage,bombGroup;

var gameOver,gameOverImage,gameOverSound;
var invisible
var score = 0

function preload(){
  
  knifeImage = loadImage("knife.png");
  woodImage = loadImage("Wood.jpg");
  fruit4 = loadImage("fruit4.png")
  fruit1 = loadImage("fruit1.png")
  fruit3 = loadImage("fruit3.png")
  fruit2 = loadImage("fruit2.png")
  bombImage = loadImage("bomb.png")
  gameOverImage = loadImage("gameover.png")
  
  cuttingSound = loadSound("cut.mp3")
  gameOverSound = loadSound("finish.mp3")
}

function setup() {
  createCanvas(600, 600);
  
  wood = createSprite(300,300,20,20)
  wood.addImage(woodImage)
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
      
  invisible=createSprite(5,300,10,600)
  invisible.visible=false
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  
  gameOver = createSprite(300,300,40,10)
  gameOver.addImage("finish",gameOverImage)
  gameOver.scale=2.5
  
  fruitGroup = createGroup();
  bombGroup = createGroup();
  
}

function draw() {
  background("pink");
  
  if(gameState===PLAY){
    
  gameOver.visible=false
  
  knife.y=World.mouseY;
  knife.x=World.mouseX;
    
  spawnFruits();
  spawnBomb();
  
  if(knife.isTouching(bombGroup))
  {
    gameState=END
    gameOverSound.play();
    
  }
    if(invisible.isTouching(fruitGroup)){
    gameState=END
    gameOverSound.play();
    }
    
    if(knife.isTouching(fruitGroup)){
      fruitGroup.destroyEach();
      cuttingSound .play();
      score = score+10
    }
    
  }else if(gameState===END){
    
    fruitGroup.destroyEach();
    bombGroup.destroyEach();
    gameOver.visible=true
    
    if(keyDown("r")&&gameState==END){
      gameState=PLAY
      score=0
    }
  }
    
  drawSprites();
  textSize(25);
  fill("black")
  stroke("white")
  text("Score : "+ score,250,50);}

function spawnFruits()
{
  if(frameCount % 50===0)
  {
    var fruit = createSprite(590,200,40,40)
    fruit.y=Math.round(random(10,580))
    fruit.velocityX=-(5+score/40)
    var rand = Math.round(random(1,4));
    switch(rand)
    {
      case 1:fruit.addImage(fruit1);
             break;
      case 2:fruit.addImage(fruit2)     
             break;
      case 3:fruit.addImage(fruit3)     
             break; 
      case 4:fruit.addImage(fruit4)     
             break;        
    }
    fruit.scale=0.3
    fruit.lifetime=130
    fruitGroup.add(fruit) 
    
  }  
}
function spawnBomb()
{
  if(frameCount % 100===0){
    bomb= createSprite(590,590,40,40)
    bomb.addImage(bombImage)
    bomb.scale=0.1
    bomb.y=Math.round(random(10,590));
    bomb.velocityX=-(4+score/50)
    bombGroup.add(bomb)
    bomb.lifetime = 130
  }  
}