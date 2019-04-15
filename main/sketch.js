var measuring_time = 180000; // milli seconds
var remaining_time;

var time_base;
var time_elapsed = 0;

var IsStop = 1;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  background(255);

  textAlign(LEFT, CENTER);
  textSize(40);
  frameRate(5);
  remaining_time = measuring_time;
}

function draw() {
  if (IsStop === 0) {
    var time_now = new Date();
    time_elapsed = time_now.getTime() - time_base;
    
    remaining_time = measuring_time - time_elapsed;
  }

  if (remaining_time <= 0) {
    noLoop();
  } else {
    clear();
    text(Math.floor(remaining_time / 1000), 100, 100);
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (IsStop === 1) {
      var tmp = new Date();
      time_base = tmp.getTime();
      IsStop = 0;
    } else {
      measuring_time = measuring_time - time_elapsed;
      IsStop = 1;
    }
  }
}
