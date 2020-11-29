var dogImage, dog, happyDogImg;
var database;
var foodS, foodStock;
var state = 0;
var feedPet, refill;
var feedImage, refillImage;
var fedTime, lastFed;
var foodObj;
var fedtime

function preload(){
  dogImage = loadAnimation("images/dog.png");
  happyDogImg = loadAnimation("images/happy.png");
}

function setup(){
  createCanvas(1000, 500);
  database = firebase.database();

  dog = createSprite(800,250,50,50);
  dog.addAnimation("normalDog", dogImage);
  dog.addAnimation("happy", happyDogImg)
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = new Food();

  feed = createButton("Feed The Dog");
  feed.position(600, 95);
  feed.mousePressed(feedDog);

  refill = createButton("Refill");
  refill.position(750, 95);
  refill.mousePressed(addFood);
 
}

function draw(){
  background(46, 139, 87);
  foodObj.display();

  lastFed = database.ref('FeedTime');
  lastFed.on("value", function(data){
    lastFed = data.val();
  });
  fill(255);
  textSize(15);
  if(lastFed >= 12){
    text("Last Fed : " + lastFed%12 + " PM", 350, 30);
  } else if (lastFed === 0){
    text("Have You Even Fed Your Dog???", 350, 30);
  } else {
    text("Last Fed : " + lastFed + " AM", 350, 30);
  }
  console.log(foodS);
  drawSprites();
}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  if(foodS != 0){
  dog.changeAnimation("happy", happyDogImg);
  if(foodS%10 === 0){
     dog.x -= 370; 
   } 
    if(dog.x != 800){
      for(var i = 9; i >= 0; i--){
        if(foodS%i === 0){
          dog.x -= 10;
        }
      }
}
  }
  foodObj.deductFood();
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime : hour()
  })
  
  console.log(lastFed);
}
function addFood(){
  if(foodS < 10 && foodS != 0){
    foodS++;
  } else if(foodS === 10){
    alert("How much will one dog drink?")
  } else if(foodS === 0){
    foodS = 10;
  } else {
    foodS = foodS;
  }
  dog.x = 800;
  dog.y = 250;
  
  database.ref('/').update({
    Food : foodS
  })
}