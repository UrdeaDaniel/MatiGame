const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const highscoreBoard = document.querySelector('.highscore');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');

let lastHole;
let timeUp = false;
let timeLimit= 20000;
let score = 0;
let countdown;
let highscore=0;

//THIS IS THE VARIABLE FOR HIT SOUND.
var myAudio;

function pickRandomHole(holes) {
const randomHole =Math.floor(Math.random() * 6)
const hole = holes[randomHole];
if(hole === lastHole){
    return pickRandomHole(holes);
}
lastHole = hole;
return hole;
}
function popOut(){
    const time = Math.random() * 1300 +400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){
        hole.classList.remove('up');
        if (!timeUp) popOut();
    }, time)
}

popOut();

function startGame(){
    startButton.style.pointerEvents = 'none';
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    myAudio = new sound("cry.mp3");
    score=0;
    popOut();
    setTimeout(function(){
        timeUp = true;
    }, timeLimit);
let startCountdown = setInterval(function(){
    countdown -= 1;
    countdownBoard.textContent = countdown;
    if(countdown < 0){
        countdown = 0;
        highscoreBoard.textContent = highscore;
        clearInterval(startCountdown);
        countdownBoard.textContent = 'L-ai făcut pe Mati să plângă';
        myMusic.stop();
        startButton.style.pointerEvents = 'all';
    }
}, 1000)
}
function playSound()
{
  myMusic = new sound("");
  myMusic.play();
}
//THIS FUNCTION IS A CONSTRUCTOR WHICH HANDLES THE AUDIO.
function sound(src) 
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function()
    {
        this.sound.play();
    }
    this.stop = function()
    {
        this.sound.pause();
    }    
}

//THESE ARE BUTTON EVENTS WHICH START THE GAME AS WELL AS THE BACKGROUND MUSIC.
startButton.addEventListener('click', startGame);
startButton.addEventListener('click', playSound);


function whack(e){
    score++;
    this.style.backgroundImage = 'url("mati2.png")';
    myAudio.play();
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("mati1.png")';
        this.style.pointerEvents = 'all';
    },800);
    scoreBoard.textContent = score;
    if(highscore < score){
        highscore=score;
    }
    
}
moles.forEach(mole => mole.addEventListener('click',whack));
