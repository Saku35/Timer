var measuring_time = 180000; //ms
var remaining_time;
var flag = 0;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  background(255);

  textAlign(LEFT,CENTER);
  textSize(40);
  frameRate(10);

  measuring_time += millis();
}

function draw() {
  clear();
  remaining_time = measuring_time - millis();
  if (remaining_time > 0){
    var sec = parseInt(remaining_time % 60000 / 1000);
    var min = parseInt(remaining_time / 60000);
    if (sec<10){
      text(min + ":0" + sec, windowWidth / 2, windowHeight/2);
    }else{
      text(min + ":" + sec, windowWidth / 2, windowHeight/2);
    }
  }else{
    noLoop();
    text("0:00", windowWidth / 2, windowHeight / 2);
  }
}

