var ground
var backgroundimage,zombieimage,hunterimage,bulletimage,gameoverimage,startimage,titleimage,zombieimage2;
var bulletArray=[]
var gameState="start"

function preload(){
backgroundimage=loadImage("assets/background.png")
zombieimage=loadAnimation("assets/zombie1.png","assets/zombie2.png","assets/zombie3.png")
hunterimage=loadImage("assets/hunter.png")
bulletimage=loadImage("assets/bullet.png")
gameoverimage=loadImage("assets/gameover.png")
startimage=loadImage("assets/start.png")
titleimage=loadImage("assets/title.png")
zombieimage2=loadAnimation("assets/zombie4.png","assets/zombie5.png","assets/zombie6.png")


}

function setup(){

createCanvas(windowWidth,windowHeight);
ground=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
ground.addImage(backgroundimage)
ground.scale=7
ground.velocityX=-2
ground.visible=false


hunter=createSprite(200,windowHeight-200,100,100)
hunter.addImage(hunterimage)
hunter.scale=1.5
hunter.debug = true;
hunter.setCollider("rectangle",-50,0,90,200)
hunter.visible=false

title=createSprite(windowWidth/2,windowHeight/2)
title.addImage(titleimage)
title.scale=7
title.visible=false

gameover=createSprite(windowWidth/2,windowHeight/2)
gameover.addImage(gameoverimage)
gameover.visible=false

startButton=createImg ("assets/start.png")
startButton.position(windowWidth/2-100,windowHeight/2+100)

zombieGroup=new Group()


}

function draw(){
    background("black")

    if(ground.x<windowWidth/2-100){
        ground.x=windowWidth/2+200
    }

    

  if(gameState==="start"){
    startButton.mouseClicked(playState)

  }


    if(gameState==="play"){
   ground.visible=true
    hunter.visible=true
    multipleZombies()

if(zombieGroup.isTouching(hunter)){
gameState="end"

}
if(bulletArray[0].isTouching(zombieGroup)){
zombieGroup[0].destroy()
}
    }


     if(gameState==="end"){
      gameover.visible=true
      zombieGroup.destroyEach()
      hunter.visible=false
      bulletArray.visible=false

     }
     
    //fire multiple bullets on clicking space bar using for loop
    //for(var i=0;i<bullet.length;i++){
    
    //}

    drawSprites()
}

//function for multiple zombies
function multipleZombies(){
   if(frameCount%100===0){
    var zombie=createSprite(windowWidth,windowHeight-190,10,10)
    zombie.scale=3;
    zombie.debug = true;
    zombie.setCollider("rectangle",-13,0,30,100)
    zombie.velocityX=-6
    zombie.lifetime=windowWidth/6
    zombie.depth=zombie.depth+1
    zombieGroup.add(zombie)

    //switch statement to create multiple zombies animation
    rand = Math.round(random(1,2))
    switch(rand)
    {
      case 1: zombie.addAnimation("zombie1",zombieimage);
      break;
      case 2: zombie.addAnimation("zombie2",zombieimage2);
      break;
      default: break;
    }
   }
}

function keyPressed(){
  if(keyCode===UP_ARROW){
    bullet=createSprite(226,475,5,5)
    bullet.addImage(bulletimage)
    bullet.scale=0.07
    bullet.debug = true;
    bulletArray.push(bullet)
  }
}

function keyReleased(){
  if(keyCode===UP_ARROW){
bulletArray[bulletArray.length-1].velocityX=3

  }
}


function playState(){
  gameState="play"
  startButton.hide()
}