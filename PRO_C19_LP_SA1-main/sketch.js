var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  ghost= createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.5;
  spookySound.loop();
}

function draw() {
  background(200);
  if (gameState=="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoor();
    if (keyDown("LEFT")){
      ghost.x=ghost.x-5
    }
    if (keyDown("RIGHT")){
      ghost.x=ghost.x+5
    }
    if (keyDown("SPACE")){
      ghost.velocityY=-10
    }
    ghost.velocityY=ghost.velocityY+0.35;
    if (ghost.isTouching(climbersGroup)){
      ghost.velocityY=0;

    }
    if(ghost.isTouching(invisibleBlockGroup)||(ghost.y>600)){
      gameState="end"

    }


    drawSprites()
  }
  if (gameState=="end"){
    textSize(30);
    text("Game Over",200,300);
    spookySound.stop();
  }
  
  
}

function spawnDoor(){
  if(frameCount%240===0){
    door=createSprite(random(120,400),-50)
    door.addImage(doorImg);
    door.velocityY= 1; 
    doorsGroup.add(door);
    climber= createSprite(door.x,10)
    climber.addImage(climberImg);
    climber.velocityY=1;
    climbersGroup.add(climber);
    invisibleBlock=createSprite(door.x,15,climber.width,3);
    invisibleBlock.velocityY=1;
    invisibleBlockGroup.add(invisibleBlock);
    ghost.depth=door.depth+1
  }

}