var initial_time = 15 * 1000; // milli seconds
var measuring_time; // 一旦中断したときの残り時間
var remaining_time; // 表示する時間
var time_base; // スタートボタンを押した時の時刻
var is_stop = 1; // timerが止まっているかどうか

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 1, 1, 1);
  background(255);
  textAlign(LEFT, CENTER);
  textSize(40);
  frameRate(5);
  remaining_time = initial_time;
  measuring_time = initial_time;
  textFont('YuGothic');
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
  fill(0,0,0);
  textSize(300);
  textAlign(CENTER);

  let txt = formatTime(remaining_time);

  if (remaining_time >= 10*1000) {
    text(txt, windowWidth / 2, windowHeight / 2);
  } else if (0 < remaining_time && remaining_time < 10 * 1000) {
    fill(1, 0, 0);
    text(txt, windowWidth / 2, windowHeight / 2);
  } else if (remaining_time === 0) {
    textSize(100);
    fill(1,0,0);
    txt = "パチ　パチ　パチ";
    // framerate下げたい。ResetのところでframeRateを元に戻したい。
    text(txt, windowWidth / 2, windowHeight / 2);
  }

  
}

function updateTime() {
  if (is_stop === 1) return;
  var time_now = new Date();
  var time_elapsed = time_now.getTime() - time_base;
  remaining_time = measuring_time - time_elapsed;
  if (remaining_time < 0) {
    remaining_time = 0;
    is_stop = 1;
  }
}


function drawBackground() {
  let sepNumX = 31;
  let mod = sepNumX;
  let lenRect = windowWidth / sepNumX;
  let sepNumY = windowHeight / lenRect;
  for (let i = 0; i < sepNumX; i++) {
    let corX = lenRect * i;
    for (let k = 0; k < sepNumY; k++) {
      let corY = lenRect * k;
      let num = 0;
      if (remaining_time > 10 * 1000) {
        num =  (i + k + Math.ceil(remaining_time / 80)) % mod; 
      } else {
        num = (i * k + Math.ceil(remaining_time / 80))% mod;
      }
      

      noStroke();
      fill(num / mod, 0.7, 0.5);
      rect(corX, corY, lenRect * 0.9, lenRect * 0.9, 5);
    }
  }
}

function drawTitle() {
  let txtSize = 100;
  fill(0, 0, 0);
  textAlign(CENTER);
  textSize(txtSize);
  text('とちぎRuby会議08', windowWidth / 2, txtSize / 2 + 20);
}

function draw() {
  clear();

  updateTime();
  drawBackground();
  drawTitle();
  dispTime();
}

function setTimer(ms) {
  if (is_stop != 1)  return;

  initial_time = ms;
  resetTimer();
}

function keyTyped() {
  // a
  if (keyCode === 97) {
    startTimer();
    return;
  }
  // z
  if (keyCode === 122) {
    stopTimer();
    return;
  }
  // r
  if (keyCode === 114) {
    resetTimer();
    return;
  }
  // 1
  if (keyCode === 49) {
    setTimer(3 * 60 * 1000);
    return;
  }
  // 2
  if (keyCode === 50) {
    setTimer(5 * 60 * 1000);
    return;
  }
  // 3
  if (keyCode === 51) {
    setTimer(15 * 60 * 1000);
    return;
  }
  // 4
  if (keyCode === 52) {
    setTimer(30 * 60 * 1000);
    return;
  }
  // 5
  if (keyCode === 53) {
    setTimer(60 * 60 * 1000);
    return;
  }
}

function startTimer() {
  if (is_stop === 0) return;
  is_stop = 0;

  var tmp = new Date();
  time_base = tmp.getTime();
}

function stopTimer() {
  if (is_stop === 1) return;
  is_stop = 1;

  var time_now = new Date();
  var time_elapsed = time_now.getTime() - time_base;
  measuring_time = measuring_time - time_elapsed;
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

function resetTimer() {
  if (is_stop != 1)  return;

  measuring_time = initial_time;
  remaining_time = initial_time;
}

function secondAdd(add_sec) {
  if (is_stop != 1)  return;

  initial_time += add_sec * 1000;
  resetTimer();
}

function minuteAdd(add_min) {
  if (is_stop != 1) return;

  initial_time += add_min * 60 * 1000;
  resetTimer();
}