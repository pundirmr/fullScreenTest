var bowl, bowlImage;
var fruit, cherry, orange, banana;
var fruitList;
var backgroundImage;
var count =0;
var life=3;

//preload all the sprites
function preload() {
  /*bowlImage = loadImage("bowl.png");
  cherry = loadImage("cherry.png");
  orange = loadImage("orange.png");
  banana = loadImage("banana.png");
*/
bowlImage = loadImage("robber.png");

  cherry = loadImage("bomb.png");
  orange = loadImage("coin.png");
  banana = loadImage("coin1.png");
  backgroundImage = loadImage("bg.jpg");
}
function setup() {
  createCanvas(screen.width - 20, screen.height - 20 );
  //Create bowl sprite
  bowl = createSprite(200, screen.height - 50, 20, 20);
  bowl.addImage(bowlImage);
  //Array of fruits
  fruitList = [cherry,orange,banana];
  //Create random fruit sprites
  fruit = createSprite(50,20,20,20);
  fruit.addImage(random(fruitList));
}

function mouseDragged(event) {
  //console.log(event.touches[0].clientX);
  bowl.position.x=event.touches[0].clientX;
}

function draw() {
  background(backgroundImage);
  fruit.position.y = fruit.position.y + 3;
  //Generate random fruit sprite
  if (fruit.position.y > height) 
    {
      life--;
      removeSprite( fruit );
      fruit = createSprite(random(10, width-10),20,20,20);
      fruit.addImage(random(fruitList));
    }
  //Move the bowl to the right and left
  if (keyDown(RIGHT_ARROW) && bowl.position.x < (width - 50))
    {
      bowl.position.x += 20;
    }
  if (keyDown(LEFT_ARROW) && bowl.position.x > 50)
    {
      bowl.position.x -= 20;
    }
  /* Moving the bowl using mouseX
  bowl.position.x=mouseX; */
  bowl.position.x=mouseX;
  //Catch fruit in the bowl
  if (fruit.overlap(bowl)) 
    {
      count++; 
      removeSprite( fruit );
      fruit = createSprite(random(10, width-10),20,20,20);
      fruit.addImage(random(fruitList));
    }
  //Display Score and Life
  fill("white");
  textSize(10);
  text("SCORE:"+count, 10,40);
  text("LIFE:"+life,500,40);
  //Game Over condition
  if(life<=0)
    {
      textSize(20);
      text("GAME OVER",50,300);
      noLoop();
    }
    drawSprites();
}
//Reset and restart the game
function mousePressed() 
{
  count=0;
  life=3;
  loop();
}
