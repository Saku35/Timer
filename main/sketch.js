var initial_time = 15 * 1000; // milli seconds
var measuring_time; // 一旦中断したときの残り時間
var remaining_time; // 表示する時間

var time_base; // スタートボタンを押した時の時刻
var is_stop = 1; // timerが止まっているかどうか

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(LEFT, CENTER);
  textSize(40);
  frameRate(5);
  remaining_time = initial_time;
  measuring_time = initial_time;

  clear();
  dispTime();
}

function dispTime() {
  var t = Math.ceil(remaining_time / 1000);
  var mm = parseInt(t / 60, 10);
  var ss = t % 60;

  var mm_2 = ('00' + mm).slice(-2);
  var ss_2 = ('00' + ss).slice(-2);
  
  text(mm_2 + ':' + ss_2, 100, 100);
}

function drawPreparation() {
  text('拍手の準備してください!', 200, 200);
}

function drawFinish() {
  text('拍手！！！！！！', 200, 200);
}

function UpdateTime() {
  var time_now = new Date();
  var time_elapsed = time_now.getTime() - time_base;
  remaining_time = measuring_time - time_elapsed;
  if (remaining_time < 0) {
    remaining_time = 0;
    is_stop = 1;
  }
}

function drawMessage() {
  if (remaining_time <= 10 * 1000 && remaining_time > 0) {
    drawPreparation();
    return;
  }

  if (remaining_time === 0) {
    drawFinish();
    return;
  }
}


function draw() {
  if (is_stop === 1) return;
  
  clear();
  // 残りの時間を計算する
  UpdateTime();

  // メッセージ書く処理
  drawMessage();
  // 背景を描く

  // 残り時間を書く
  dispTime();
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
  // if (is_stop != 1) return;

  var tmp = new Date();
  time_base = tmp.getTime();

  is_stop = 0;
}

function stopTimer() {
  // if (is_stop != 0) return;

  var time_now = new Date();
  var time_elapsed = time_now.getTime() - time_base;
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

  clear();
  dispTime();
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