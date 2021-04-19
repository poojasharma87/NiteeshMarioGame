var  blocksImg, coinsImg, mariorunningImg,mariojumpingImg;
var mountainImg,platformImg,tubesImg,coinImg;
var frontImg, backImg;
var score=0;
var grassImg;
var tubes01Img;
var tubes02Img,tubes03Img;
var resot,resotImg;
var fpg;
gameState="start";
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
//".png"
//".png"
mountainImg=loadImage("mountains01.png");	

fpg=loadImage("Noob2.jpg");

tubes01Img=loadImage("142-1427188_trap-png-transparent-png-removebg-preview.png");

resotImg=loadImage("reset-removebg-preview.png");

tubes02Img=loadImage("slimecover-removebg-preview.png");

tubes03Img=loadAnimation("mayker-gif-slime.gif");

grassImg=loadImage("mountains04.png");	

platformImg=loadImage("platform.png");

coinImg=loadAnimation("coin01.png","coin02.png","coin03.png","coin04.png","coin05.png");

mariorunningImg=loadAnimation("mario01.png","mario02.png","mario03.png","mario04.png","mario05.png","mario06.png");

mariojumpingImg=loadAnimation("mario13.png","mario14.png","mario15.png","mario16.png","mario17.png","mario18.png");

frontImg=loadImage("Noob2.jpg");

backImg=loadImage("Noob.png");

}


function setup() {
	createCanvas(1280,600);


	engine = Engine.create();
	world = engine.world;

	start=createSprite(650,300,200,200);
	start.visible=false;

backgr=createSprite(640,0,1280,600);
backgr.addImage(backImg);
backgr.velocityX=-2;
backgr.visible=false;	

mario=createSprite(100,430,50,50);
mario.addAnimation("running",mariorunningImg);
mario.scale=0.9;
mario.visible=false;

ground=createSprite(640,500,1280,10);
ground.visible=false;

resot=createSprite(640,450,50,50);
resot.addImage("reset",resotImg);
resot.visible=false;
resot.scale=0.2;

coinsGroup=new Group();
tubesGroup=new Group();

	Engine.run(engine);
  
}


function draw() {
 
  background(0);
  if (gameState==="start") {
	background(fpg);
	textSize(30);
	fill("black");
	text("Click on the Mario to Start the game",400,100);
	if (mousePressedOver(start)) {
		gameState="play";
	}
  }
  
  else if (gameState==="play") {
	
	backgr.visible=true;
	mario.visible=true;
	if(mario.y>430){
		mario.y=430;	
	}
	
  if (backgr.x<350) {
	backgr.x=backgr.width/2;	
	}
	if (ground.x<350) {
		ground.x=ground.width/2;	
		}
	if (keyDown("space")) {
		mario.velocityY=-12;
		mario.changeAnimation("jumping",mariojumpingImg);
	}
	mario.velocityY=mario.velocityY+0.8;
mario.collide(ground);
spawnCoins();
if (coinsGroup.isTouching(mario)) {
	score=score+1;
	coinsGroup.destroyEach();
}
spawnTubes();

if (tubesGroup.isTouching(mario)) {
	gameState="end";
	
}
  }
  
	  
  else if (gameState==="end"){
	  backgr.visible=false;
	  mario.visible=false;
	  coinsGroup.destroyEach();
	  tubesGroup.destroyEach();
	  coinsGroup.setVelocityXEach(0);
	  tubesGroup.setVelocityXEach(0);
	textSize(30);
	fill("red");
	text("Game Over",600,300);
	resot.visible=true;
  }
  if (mousePressedOver(resot)) {
	  restart();
  }
  drawSprites();
textSize(25);
fill("black");
  text("Score "+score,1100,50);
}

function restart(){
	gameState="start";

	resot.visible=false;
	//backgr.visible=true;
	//mario.visible=true;
	score=0;
	
	
	}
function spawnCoins() {
	//write code here to spawn the coins
	if (frameCount % 90 === 0) {
	  var coin = createSprite(1200,240,30,30);
	  coin.y = Math.round(random(240,320));
	  coin.addAnimation("moving",coinImg);
	  coin.scale = 3.0;
	  coin.velocityX = -6;
	  
	   //assign lifetime to the variable
	  coin.lifetime = 220;
	  
	  //adjust the depth
	  coin.depth = mario.depth;
	  mario.depth = mario.depth + 1;
	  
	  //add each coin to the group
	  coinsGroup.add(coin);
	}
	
  }
  
  function spawnTubes() {
	if(frameCount % 200 === 0) {
	  var tube = createSprite(1200,470,100,100);
	  tube.velocityX = -8;
	  //tube.debug=true;
	  tube.setCollider("rectangle",0,0,300,300);
	  //generate random tubes
	  var rand = Math.round(random(1,2));
	  switch(rand) {
		case 1: tube.addImage(tubes01Img);
				break;
		case 2: tube.addImage(tubes02Img);
				break;
				
		
		default: break;
	  }
	  //assign scale and lifetime to the tube           
	  tube.scale = 0.2;
	  tube.lifetime = 300;
	  //add each tube to the group
	  tubesGroup.add(tube);
	}
  }


