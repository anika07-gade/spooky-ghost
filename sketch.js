var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var spookySound

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);

  tower.velocityY = 3;

  doorsGroup = new Group();
  climbersGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  if(gameState === "play"){

 
  if(tower.y > 400){
      tower.y = 300


    }
    if(keyDown("left_arrow")){
      ghost.x -=3;
    }
    if(keyDown("right_arrow")){
      ghost.x +=3;
    }
    if(keyDown("space")){
      ghost.velocityY =-5;
    }    
    ghost.velocityY+=0.8;
    spawndoors();
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
   
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
ghost.destroy();
gameState = "end"
    }
    drawSprites();
  }
  
    if(gameState === "end"){
      stroke("white")
      fill("red")
      textSize(40)
      text("GAME OVER",230,250);
    }
  
 
}
function spawndoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200,-50);
       door.addImage(doorImg);

    climber = createSprite(200,10);
    climber.addImage(climberImg);

  invisibleBlock = createSprite(200,15);
  invisibleBlock.width  = climber.width
  invisibleBlock.height = 2;

    door.x = Math.round(random(120,400))
    door.velocityY = 3;

    climber.x = door.x;
    climber.velocityY = 3;

    invisibleBlock.x = door.x
invisibleBlock.velocityY = 3;

    door.lifetime = 800;
    climber.lifetime = 800;

    ghost.depth = door.depth;
    ghost.depth+=1;
doorsGroup.add(door);
climbersGroup.add(climber);
invisibleBlock.debug = true;
invisibleBlockGroup.add (invisibleBlock);
  }
    
  
}
