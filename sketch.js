
var xp1, yp1, l1,a1;
var xball,yball, diameter;
var xp2, yp2, l2, a2;
var xp3, yp3, l3, a3;
var xp4, yp4, l4, a4;
var xballchange;
var yballchange;
var pontos;
var vida;
var estado;
var menuprin;
var instruçao;
var lose;
var win;
var hit1,hit2, hit3, hit4;
var w=[];
var music;




function preload(){
  menuprin = loadImage("Menu principal.jpeg");
  instruçao = loadImage("Instrução.jfif");
  win = loadImage(" vitoria.jpeg");
  lose = loadImage("derrora.jfif")
  music=loadSound("fight.wav",playSound)
}

function setup() {
  createCanvas(500, 400);
//jogador 1  
  xp1=05;
  yp1=200;
  l1=10;
  a1=50;
  
// Barreira
  xp2=400;
  yp2=200;
  l2=10;
  a2=25;
  
// barreira de espinhos
  xp3=400;
  yp3=300;
  l3=10;
  a3=25;
  
//barreira de pontos
  xp4=400;
  yp4=100;
  l4=10;
  a4=25;
  
//bola
  xball= width/2;
  yball= height/2;
  diameter=15;
// atributos
  pontos=0;
  vida = 100;
  xballchange= 5;
  yballchange= 5;
  estado=0

  w[0]=1;
  w[1]=2;
  w[2]=3;
  w[3]=4;
  
  
  
  
}



function draw(){
  
  if(estado==0){
    menu()
  }
  if(estado==1){
    preparar()
  }
  if(estado==2){
    fase1()
  }    
  if(pontos>=500){
    vitoria()
  }
  if(vida<=0){
    gameover()
  }
  
} 
 
function fase1(){
  background(100, 140, 103,);
  strokeWeight(4);
  line(width/2,0,width/2,400);
  fill(50,200,10);
  text("SCORE:"+ pontos,380, 20 );
  text("LIFE:"+ vida, 50,20);
  
  
//jogador1
  fill('BLACK')
  strokeWeight(1)
  rect(xp1,yp1,l1,a1);
//mover jogador
  fill(0,55,200);
  movePlayer()

//barreira 
  fill('WHITE')
  strokeWeight(1)
  rect(xp2,yp2,l2,a2);
  
// barreira de espinho 
  fill('RED')
  strokeWeight(1)
  rect(xp3,yp3,l3,a3);
// barreira de pontos
  fill('BLUE')
  strokeWeight(1)
  rect(xp4,yp4,l4,a4);
  
  movebarreira();
  
  movebaespinho();
  
  movebaponto();
  fill(50,200,10);
  
  if(pontos<=100){
    text("fase "+w[0],width/2,20);
  }
  if(pontos>=100&& pontos<=200){
    text("fase "+w[1],width/2,20);
  }
  if(pontos>=200 && pontos<=350){
    text("fase "+w[2],width/2,20);
  }
  if(pontos>=350){
    text("fase "+w[3],width/2,20);
  }
  
  
//bola
  
  fill(255);
  strokeWeight(1);
  circle(xball,yball,diameter);
// movimentação da bola
  
  xball += xballchange;
  yball += yballchange;

  moveBall()
 
  rebater()
  
}

function movePlayer(){
  if(keyIsDown(UP_ARROW)){
    yp1=yp1-3;
  }
  if(keyIsDown(DOWN_ARROW)){
    yp1=yp1+3;
  }
}
function moveBall(){
  if(xball<diameter/2 || xball> width - 0.5* diameter){
    xballchange *= -1;
        
  }
  if(yball<diameter/2 || yball> height - diameter){
    yballchange *= -1;
   
  }
  if(xball<diameter/2) {
    vida=vida-5
  }


}
function movebarreira(){
  yp2=yp2-2
  if(yp2<-100){
    yp2=400
  }
}

function movebaespinho(){
  yp3=yp3-2
  if(yp3<-100){
    yp3=400
  }
}

function movebaponto(){
  yp4=yp4-2
  if(yp4<-100){
    yp4=400
  }
}


function rebater(){
  hit1 = collideRectCircle(xp1, yp1, l1, a1, xball, yball, diameter)
  if(hit1==true){
    xballchange *= -1;
    yballchange *= -1;
    pontos=pontos+30;
    
  
  }
   
  hit2 = collideRectCircle(xp2, yp2, l2, a2, xball, yball, diameter);
  if(hit2==true){
    xballchange *= -1;
    yballchange *= -1;
  vida=vida+2
  }
   hit3 = collideRectCircle(xp3, yp3, l3, a3, xball, yball, diameter);
  if(hit3==true){
    xballchange *= -1;
    yballchange *= -1;
  vida=vida-2
  }
  
  hit4 = collideRectCircle(xp4, yp4, l4, a4, xball, yball, diameter);
  if(hit4==true){
    xballchange *= -1;
    yballchange *= -1;
  pontos=pontos+5
  }
  
} 

function menu(){
  background(menuprin);
  fill('white');
  rect(width/2, height/2, 176, 40, 10);
  textSize(20);
  fill("Black")
  text('APERTE ENTER',width/2+5, height/2+30)
}
function preparar(){
  background(instruçao);
  fill('white');
  rect(width/2, height/2+30, 300, 40, 10);
  textSize(20);
  fill("Black")
  text('APERTE ESPAÇO ',width/2+5, height/2+60)
}
function gameover(){
   background(lose);
  xball= width/2;
  yball= height/2;
  xp1=05;
  yp1=200;
  l1=10;
  a1=50;
  
}
function vitoria(){
  
  background(win);
  xball= width/2;
  yball= height/2;
  xp1=05;
  yp1=200;
  l1=10;
  a1=50;

  

}  
function playSound(){
music.play();
}



function keyPressed(){
  if(keyCode === ENTER){
    estado=1;
  }
  if(keyCode === ESCAPE){
    estado=0;
    vida=100;
    pontos=0;
    
    
  }
  if(keyCode=== 32){
    estado=2
  }
  
}
























