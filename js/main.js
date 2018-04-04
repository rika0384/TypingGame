(function(){
  'use strict';

  var words = ['egg','bag','rose','chair','bat',
              'fish','notebook','pencil','dog','desk',
              'watch','mitt','milk','flower','door',
              'bird','sheep','cup','bus','apple',
              'fruit','car','cake','picture','cat',
              'stamp','plane','book','racket','glass',
              'bed','letter','tape','cap','mail',
              'box','bread','doll','table','tree',
              'pen','map','cow','pot','camera',
              'hand','lemon','evening','morning','night',
              'noon','tomorrow','time','afternoon','diary',
              'meal','breakfast','lunch','dinner','supper',
              'walk','work','basketball','baseball','tennis',
              'homework','season','spring','summer','autumn',
              'fall','winter','minute','week','month',
              'year','hour','day','January','February',
              'March','April','May','June','July',
              'August','September','October','November','December',
              'Sunday','Monday','Tuesday','Wednesday','Thursday',
              'Friday','Saturday'
              ];

var currentWord = '';
var currentLocation = 0;
var score = 0;
var miss = 0;

var isRunning = false;

var startTime;
var timeLeft;
var timeToCountDown = 60 * 1000; // 1min;
var timerId;

var WARNING = 10*1000; //font color change

var target = document.getElementById('target');
var scoreLabel = document.getElementById('score');
var missLabel = document.getElementById('miss');
var timer = document.getElementById('timer');
var top = document.getElementById('topInfo');

function setTarget(){
  var str = words[ Math.floor( Math.random() * words.length )];
  currentWord = str;
  target.textContent = currentWord;
  currentLocation = 0;
}


  function updateTimer(t){
    var d = new Date(t);
    var m = d.getMinutes();
    var s = d.getSeconds();
    var ms = d.getMilliseconds();
    var timerString;
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('00' + ms).slice(-3);
    timerString = m + 'm ' + s + 's ' + ms;
    timer.textContent = timerString;
  }

function countDown(){
  timerId = setTimeout(function(){
    var elapsedTime = Date.now() - startTime;
    timeLeft = timeToCountDown - elapsedTime;
    //console.log(timeLeft);

    if(timeLeft < WARNING){ // font color change

      timer.className = 'warning';

    }else{

      timer.className = '';

    }

    if(timeLeft < 0){
      isRunning = false;
      top.textContent = "Press Space Key to Restart";
      clearTimeout(timerId);
      timeLeft = 0;
      timeToCountDown = 0;
      updateTimer(timeLeft);
  //    console.log(timeToCountDown);
      return;
    }
    updateTimer(timeLeft);
    countDown();
  },10);

}


document.onkeydown = keydown;

function keydown(){

  if(isRunning === false){

  //  console.log(event.keyCode);
//    console.log(isRunning );
    if(event.keyCode === 32){
      isRunning = true;
      top.textContent ="";
      startTime = Date.now();
      score = 0;
      scoreLabel.textContent = score;
      miss = 0;
      missLabel.textContent = miss;
      timeToCountDown = 60 * 1000; // 1min;
      setTarget();
      //console.log("START");
      countDown();
    }

  }else{
    if(event.keyCode + 32 === (currentWord.toLowerCase()).charCodeAt(currentLocation)) {
      score++;
      scoreLabel.textContent = score;
      currentWord = currentWord.replace(currentWord[currentLocation], '_');
      target.textContent = currentWord;
      currentLocation++;
      if(currentLocation === currentWord.length) {
        setTarget();
      }
    }else{
      miss++;
      missLabel.textContent = miss;
    }
  }
}

})();
