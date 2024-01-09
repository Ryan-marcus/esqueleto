//Colocar inimigos e arrumar as portas
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "server"
var invisibleGround,invisibleGroundImg;
var title,titleImg;
var door2,door2Img,doors2Group;
var guy,guyImg;
var button,buttonImg;
var score = 0;
var balasGroup;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  invisibleGroundImg= loadImage("base.png");
  titleImg = loadImage("title.png");
  buttonImg = loadImage("button.png");
  door2Img = loadImage("door_guy.png");
  guyImg = loadImage("guy.png");
}

function setup() {
  createCanvas(600, 600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  invisibleGround = createSprite(300,600,750,5);
  //invisibleGround.addImage(invisibleGroundImg);
  //invisibleGround.scale=0.5
  invisibleGround.visible=false
  doorsGroup=new Group();
  doorsGroup2=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  balasGroup = new Group();

  ghost=createSprite(200,500,50,50);
  ghost.scale=0.3;
  ghost.addImage("ghost",ghostImg);

  title=createSprite(300,300,50,50)
  title.addImage(titleImg);
  title.scale=1.4
  title.visible=false;

  button=createSprite(300,450,50,50);
  button.addImage(buttonImg);
  button.scale=0.5
}

function draw() {
  background(200);
  if (gameState=="server") {
    title.visible=true;
    ghost.velocityY=0;
    tower.velocityY=0;
    //door.velocityY=0;
    //invisibleBlock.velocityY=0;
    //climber.velocityY=0;
    if (mousePressedOver(button)) {
      gameState="play";
    }
  } else if(gameState=="play"){
    //estado play
    score=score+Math.round(getFrameRate()/60)
    title.visible=false;
    button.visible=false;
    tower.velocityY=6

    spawnDoors();
    enemy()
    time();
    // door.depth=ghost.depth;
    // ghost.depth+=1

    if (keyDown("left_arrow")) {
      ghost.x=ghost.x-5
    }

    if (keyDown("right_arrow")) {
      ghost.x=ghost.x+5
    }
    
    if (keyDown("space")&&ghost.y>=180) {
      ghost.velocityY=-15;
    }
    ghost.velocityY=ghost.velocityY+0.8;

    if(tower.y > 550){
      tower.y = 90
    }


    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY=0;
    }
  
    if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600) {
      ghost.destroy();
      gameState="end";
    }

  }

  else if(gameState=="end") {
    tower.destroy()
    stroke("red");
    fill("blue");
    textSize(30)
    text("Fim de Jogo!",230,50);
    //door.visible=false
   // climber.destroy();
    //invisibleBlock.destroy();
    button.visible=true
    title.visible=true
    
    
    if (mousePressedOver(button)) {
      //gameState="server";
      location.reload();
    }

  }
   ghost.collide(invisibleGround);
    drawSprites();
    
    textSize(30);
    fill("red");
    text("Score: "+score,30,50)


}

function spawnDoors() {
  if (frameCount%240===0) {
    var door=createSprite(200,-50);
    var climber=createSprite(200,10);
    var invisibleBlock=createSprite(200,15);

    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;

  door.addImage(doorImg);
  climber.addImage(climberImg);
  door.x=Math.round(random(120,400));
  climber.x=door.x;
  invisibleBlock.x=door.x;
  door.velocityY=1;
  climber.velocityY=1;
  invisibleBlock.velocityY=1;
  ghost.depth=door.depth;
  ghost.depth+=1;
  ghost.lifetime=800;
  climber.lifetime=800;
  invisibleBlock.lifetime=800;
  door.lifetime=800;
  doorsGroup.add(door);
  climbersGroup.add(climber);
  
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.debug=true;
  }
}
function time() {
  setTimeout(() => {
    invisibleGround.destroy();
  }, 5000);
}
function enemy() {
  if (frameCount%240===0) {
    var f;
    var door2=createSprite(200,-50);
    var climber=createSprite(200,-3);
    var invisibleBlock=createSprite(200,15);
    var balas=createSprite(200,-4);
    var guy=createSprite(200,f)
    balas.scale=0.5

    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;

  door2.addImage(door2Img);
  climber.addImage(climberImg);
  guy.addImage(guyImg)

  door2.x=Math.round(random(300,500));
  climber.x=door2.x;
  invisibleBlock.x=door2.x;
  //guy.x=door2.x
  guy.velocityY=1


  door2.velocityY=1;
  climber.velocityY=1;
  invisibleBlock.velocityY=1;
  guy.velocityY=1;
  balas.velocityX=-20;

  ghost.depth=door2.depth;
  ghost.depth+=1;

  ghost.lifetime=800;
  climber.lifetime=800;
  invisibleBlock.lifetime=800;
  guy.lifetime=800
  door2.lifetime=800;

  guy.collide(climber);
  guy.scale=0.5

  // var balasX = Math.random() - 0.5; // Valor entre -0.5 e 0.5
  // var balasY = Math.random() - 0.5; // Valor entre -0.5 e 0.5

  doorsGroup2.add(door2);
  climbersGroup.add(climber);
  balasGroup.add(balas);

  f.y=door2.y
  
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.debug=true;
  }
}
