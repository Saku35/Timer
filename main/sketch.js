var initial_time = 15 * 1000; // milli seconds
var measuring_time; // 一旦中断したときの残り時間
var remaining_time; // 表示する時間

var time_base; // スタートボタンを押した時の時刻
var is_stop = 1; // timerが止まっているかどうか

//fixme
var m_start_time;
var m_total_msec;
var m_offset_msec;
var m_start_pressed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(LEFT, CENTER);
  textSize(40);
  frameRate(5);
  remaining_time = initial_time;
  measuring_time = initial_time;

  m_total_msec = 15 * 1000;
  m_offset_msec = 0;
  m_start_pressed = false;

  clear();
  dispTime();
}

function formatTime(t) {
  let msec = Math.ceil(t / 1000);
  let mm = ('00' + parseInt(msec / 60, 10)).slice(-2);
  let ss = ('00' + (msec % 60)).slice(-2);

  return mm + ':' + ss;
}

function dispTime() {
  text(formatTime(remaining_time), 100, 100);
}

function drawPreparation() {
  text('拍手の準備してください!', 200, 200);
}

function drawFinish() {
  text('拍手！！！！！！', 200, 200);
}

function UpdateTime() {
  if (is_stop === 1) return;
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
  //a
  if (keyCode === 97) {
    startTimer();
    return;
  }
  //z
  if (keyCode === 122) {
    stopTimer();
    return;
  }
}

function startTimer() {
  if (is_stop === 0) return;

  var tmp = new Date();
  time_base = tmp.getTime();

  is_stop = 0;
}

function stopTimer() {
  if (is_stop === 1) return;

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