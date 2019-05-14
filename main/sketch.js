var measuring_time = 10 * 1000; // milli seconds
var remaining_time;
var initial_time;
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
  initial_time = measuring_time;
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
  if (keyCode === 97) {
    startTimer();
    return;
  }
  
  if (keyCode === 122) {
    stopTimer();
    return;
  }
}

function startTimer() {
  if (is_stop != 1) return;

  var tmp = new Date();
  time_base = tmp.getTime();

  is_stop = 0;
}

function stopTimer() {
  if (is_stop != 0) return;

  var time_now = new Date();
  time_elapsed = time_now.getTime() - time_base;
  measuring_time = measuring_time - time_elapsed;

  is_stop = 1;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    secondAdd(1);
    return;
  }
  
  if (keyCode === DOWN_ARROW) {
    secondAdd(-1);
    return;
  }
}

function timerReset() {
  if (is_stop != 1)  return;

  measuring_time = initial_time;
  remaining_time = measuring_time;
}

function secondAdd(add_sec) {
  if (is_stop != 1)  return;

  initial_time += add_sec * 1000;
  timerReset();
}

function minuteAdd(add_min) {
  if (is_stop != 1) return;

  initial_time += add_min * 1000 * 60;
  timerReset();
}