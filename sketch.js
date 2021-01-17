let dog, happyDog, database, dogImage, food,lazy;
var foodStock;
let feed,addFood;
let lastFed;
let date,time;
let flag=0,count=0;
let dogName="Bosco";
let bedroomImg,washroomImg, gardenImg;
let gameState;
var timeNow;
var lazyImg;
var lastFedhr;

function preload()
{
   dogImage=loadImage("images/Dog.png");
   happyDog=loadImage("images/happydog.png");
   bedroomImg=loadImage("images/Bed Room.png");
   washroomImg=loadImage("images/Wash Room.png") ;
   gardenImg=loadImage("images/Garden.png");
   lazyImg=loadImage("images/Lazy.png");
}
function setup()
{
  createCanvas(windowWidth-100,windowHeight-150);
  database=firebase.database();
  dog=createSprite(width-100,height/2+60);
  dog.addImage(dogImage);
  dog.scale=0.3; 

  food=new Food();
  food.getFoodStock();
  food.getlastFed();
  
  
  feed=createButton("Feed the dog");
  feed.position(100,170);
  feed.mousePressed(food.deductFood);
  
  addFood=createButton("Add food inside the basket");
  addFood.position(100,220);
  addFood.mousePressed(food.addFoods);

 // dogName=createInput("Bosco");
  //dogName.position(100,130);

  database.ref('gameState').on("value",function(data)
  {
    gameState=data.val();
  })

}
function draw()
{
  background("coral");
 
  textAlign(CENTER);
  textSize(25);
  fill("black");
  stroke("yellow");
  strokeWeight(2);
  textFont("Luta")
  text("Press the button to feed "+dogName,width/2, 30);
  text("Food Stock left for the dog: "+foodStock,width/2,80);
  text("Last fed: "+lastFed,width/2,140);

  
  food.display();
  if(flag===1)
  {
    push();
    food.visibility-=5;
    count++;
    tint(255,food.visibility);
    image(food.milk,width-180,height/2+140,90,90);
    pop();
    if(count===51)
    {
        flag=0;
        count=0;
        food.visibility=255;
    }
  }

  if(gameState!=="Hungry")
  {
    feed.hide();
    addFood.hide();
    //dog.visible=false;
  }
  else{
    feed.show();
    addFood.show();
   // dog.addImage(lazyImg);
  }
  
  
  var timeN=hour();
 
  if(lastFed)
  {
      lastFedhr=parseInt(lastFed.slice(0,2));
  }

  if(timeN<=lastFedhr+1)
  {
    updateState("Playing");
    food.garden();
    dog.addImage(happyDog);
  }
  else if(timeN>lastFedhr+1 && timeN<=lastFedhr+2)
  {
    updateState("Sleeping");
    food.bedroom();
    dog.addImage(happyDog);
  }
  else if(timeN>lastFedhr+2 && timeN<=lastFedhr+4)
  {
    updateState("Bathing");
    food.washroom();
    dog.addImage(happyDog);
  }
  else{
    updateState("Hungry");
    food.display();
    dog.visible=true;
    dog.addImage(lazyImg);
  }
  
  drawSprites();
  text("The dog is "+gameState,130, 30);

}

function showTime()
{
    let time = new Date(); 
    let hour = time.getHours(); 
    let min = time.getMinutes(); 
    let sec = time.getSeconds(); 
    am_pm = "AM"; 
  
    if (hour > 12) { 
        hour -= 12; 
        am_pm = "PM"; 
    } 
    if (hour == 0) { 
        hr = 12; 
        am_pm = "AM"; 
    } 
  
    hour = hour < 10 ? "0" + hour : hour; 
    min = min < 10 ? "0" + min : min; 
    sec = sec < 10 ? "0" + sec : sec; 
  
    let currentTime = hour + ":" 
            + min + ":" + sec + am_pm; 
  
    return currentTime;

}
function updateState(gs)
    {
        database.ref('/').update({
            gameState:gs
        })
    }