let ms = 0;
let secs = 0;
let mins = 0;
let timeoutId;

let isCounting = false; 

module.exports = function timer(event) {
  if (event.keyCode === 32) {
    if(!isCounting) {
      resetTime();
      isCounting = true;
      timeoutId = setInterval(countTime, 1);
      document.getElementById('time').style.color = 'red';
    } else {
      isCounting = false;
      clearTimeout(timeoutId);
      document.getElementById('time').style.color = 'black';
    }
  }
}

function countTime() {
  ms+=1;
  if(ms>=100) {
      secs+=1;
      ms = 0;
  }
  if(secs>=60) {
      mins+=1;    
      secs = 0;
  }
  if(mins>=60) {
      mins = 0;    
  }
  document.getElementById('time').innerHTML = mins + ' : ' + secs + ' : ' + ms;
}

function resetTime() {
  ms = 0;
  secs = 0;
  mins = 0;
}