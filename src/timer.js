let ms = 0;
let secs = 0;
let mins = 0;
let timeoutId;

let isCounting = false; 

module.exports = function timer(event) {
  if (event.keyCode === 32) {
    if(!isCounting) {
      resetTime();
      document.getElementById('time').style.color = 'red';
      isCounting = true;
      timeoutId = setInterval(countTime, 1);
    } else {
      isCounting = false;
      document.getElementById('time').style.color = 'black';
      clearTimeout(timeoutId);
    }
  }
}

function countTime() {
  ms += 1;
  if(ms >= 100) {
      secs+=1;
      ms = 0;
  }
  if(secs >= 60) {
      mins += 1;    
      secs = 0;
  }
  let time = mins + ' : ' + secs + ' : ' + ms;
  time = time.replace(/^([0-9])\s/, '0$1 ').replace(/\s([0-9])\s/, ' 0$1 ').replace(/\s([0-9])$/, ' 0$1');
  document.getElementById('time').innerHTML = time;
}

function resetTime() {
  ms = 0;
  secs = 0;
  mins = 0;
}