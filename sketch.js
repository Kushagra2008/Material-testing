var bullet, speed, weight, gunImage;
var damage, resetImage, backgroundImage;
var gamestate , PLAY, END, reset;
var rating, gun, wall, wallThick;
var bulletedge, walledge, timer, gamestate2;
PLAY = 0;
END = 1;
rating = "-";
function preload()
{
  resetImage = loadImage("restart.png");
  backgroundImage = loadImage("background.png");
  gunImage = loadImage("gun.png")
}
function setup() 
{
  createCanvas(1600,400);
  gun = createSprite(20, 200, 10, 10);
  gun.addImage(gunImage);
  gun.scale = 0.1;
  reset = createSprite(620, 200);
  reset.addImage(resetImage);
  weight = Math.round(random(30, 52));
  speed = Math.round(random(223, 321));
  bullet = createSprite(50, 185, 50, 8);
  bullet.x = 140;
  bullet.visible = false;
  bullet.velocityX = speed;
  bullet.shapeColor = "white";
  gamestate = PLAY;
  wallThick = Math.round(random(22, 83));
  wall = createSprite(1500, 200, wallThick, window.height);
}

function draw() 
{
  background(backgroundImage);
  bullet.depth = gun.depth;
  bullet.depth++;
  if (gamestate == PLAY)
  {
    if (bullet.x > 167)
    {
      bullet.visible = true;
    }
    wall.width = wallThick;
    bullet.shapeColor = "white";
    bullet.velocityX = speed;
    reset.visible = false;
    if (hasCollided(wall, bullet))
    {
      bullet.velocityX = 0;
      gamestate = END;
    } 
  }
  if (gamestate == END)
  {
    reset.visible = true;
    if (mousePressedOver(reset))
    {
      weight = Math.round(random(30, 52));
      speed = Math.round(random(223, 321));
      wallThick = Math.round(random(22, 83));
      bullet.x = 140;
      wall.shapeColor = "white";
      gamestate = PLAY;
    }
    damage = Math.round((0.5 * weight * speed ** 2) /(wall.width ** 3));
    if (damage < 10)
    {
      wall.shapeColor =  "green";
      rating = "GOOD!😀";
    }
    else if (damage > 10)
    {
      wall.shapeColor = "red";
      rating = "BAD!🙁";
    }   
  }
  drawSprites();
  stroke("red");
  fill("red");
  text("SPEED: " + speed + " km/h", 350, 380);
  text("WEIGHT: " + weight + " g", 470, 380);
  if (gamestate === END)
  {
    stroke("black");
    fill("black");
    line(20, 100, 80, 50);
    stroke("red");
    fill("red");
    text("THE MATERIAL IS " + rating, 60, 40);
    text("THE DAMAGE WAS: " + damage, 585, 380);
    //text("RERUN TEST", 600, 200);
  }
}

function hasCollided(lwall, rbullet)
{
  bulletedge = rbullet.x + rbullet.width;
  walledge = lwall.x;
  if (bulletedge>=walledge)
  {
    return true;
  }
  return false;
}