const Engine= Matter.Engine;
const World= Matter.World;
const Bodies= Matter.Bodies;
const Constraint= Matter.Constraint;

var engine,world;
var particles=[];
var plinkos=[];
var divisions=[];
var divisionHieght=300;
var score=0;
var particle;
var count=0;
var gameState= "start";

function setup() {
  createCanvas(800,800);

  engine= Engine.create();
  world=engine.world;
}

function draw() {
  background("green");  

  fill("yellow");
  var line=Bodies.rectangle(400, 500, 800, 10);

  fill("white");
  textSize(35);
  text("score: " + score, 50, 30);

  text("500", 15, 550);
  text("500", 95, 550);
  text("500", 175, 550);
  text("500", 255, 550);
  text("100", 335, 550);
  text("100", 415, 550);
  text("100", 495, 550);
  text("200", 575, 550);
  text("200", 655, 550);
  text("200", 735, 550);

  for(var k=0; k<=width; k=k+80) {
    divisions.push(new Division(k, height-divisionHieght/2, 10, divisionHieght));
  }

  for(var j=40; j<=width; j=j+50){
    plinkos.push(new Plinko(j,75));
  }
  for(var j=15; j<=width-10; j=j+50) {
    plinkos.push(new Plinko(j,175));
  }

  if(frameCount%60===0) {
    particles.push(new Particle(random(width/2-10, width/2+10), 10, 10));
  }

  ground=new Ground(400,800,800,10);
  rect(00, 475, 800, 10);

  for(var j=0; j<particles.length; j++) {
    particles[j].display();
  }

  for(var k=0; k<divisions.length; k++) {
    divisions[k].display();
  }

  for(var i=0; i<plinkos.length; i++) {
    plinkos[i].display();
  }

  if(particle!=null) {
     
    if(particle.body.position.y > 500) {
      if(particle.body.position.x < 255) {
        score= score + 500;
        particle= null;
      } 
      else if(particle.body.posiion.x < 495) {
        score= score + 100;
        particle= null;
      }
      else if(particle.body.position.x > 495) {
        score= score + 200;
        particle= null;
      }
    }
  }

  if(particle.body.position.y > 550) {
    count=count+1;
  }

  if(count>=5) gameState="end";


  ground.display();
  Engine.update(engine);
  
}

function mousePressed() {
  if(gameState!=="end"){
    particle=new Particle(mouseX, 10, 10, 10);
  }
}