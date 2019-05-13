var measuring_time = 10 * 1000; // milli seconds
var remaining_time;
var time_base;
var time_elapsed = 0;
var is_stop = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(LEFT, CENTER);
  textSize(40);
  frameRate(5);
  remaining_time = measuring_time;
}

function draw() {
  if (is_stop === 0) {
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

function keyTyped() {
  switch (keyCode) {
    case 97: // aキー
      if (is_stop === 1) {
        var tmp = new Date();
        time_base = tmp.getTime();
      }
      is_stop = 0;
      break;
    case 122: // zキー
      if (is_stop === 0) {
        measuring_time = measuring_time - time_elapsed;
      }
      is_stop = 1;
      break;
    default:

  }
}

function timerReset() {
  if (is_stop === 1) {
    measuring_time = 10*1000;
    remaining_time = measuring_time;
  }
}