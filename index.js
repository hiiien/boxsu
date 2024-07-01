var timeUp = false;
var boxId;
var timeoutId;
var hasLost = false;
var gameStarted = false;
var intervalId;
var intervalCheckLossId;
var level = 0;
var boxColorChangeSpeed = 2990;
var gameInterval;
var clickSound = new Audio("./sounds/yellow.mp3");
var loseSound = new Audio("./sounds/wrong.mp3");
var scoreCount = 0;  

function chooseBox(){
    var boxNum = Math.floor(Math.random() * 20) + 1;
    var boxId = "#box-" + boxNum;
    $(boxId).addClass("active-button");
        timeoutId = setTimeout(() => {
        timeUp = true;
        $(boxId).removeClass("active-button");
        $(boxId).addClass("lose-condition");
      }, boxColorChangeSpeed);
    
}

function checkLoss(){
    if($("div").hasClass("lose-condition") && !hasLost){
        clearTimeout(timeoutId);
        clearInterval(gameInterval);
        clearInterval(intervalId);
        clearInterval(intervalCheckLossId);
        youLose();
    }
}

function youLose(){
    loseSound.play();
    $("h1").text("You Lose! Press A Key To Start");
    $("div").removeClass("lose-Condition");
    $("div").removeClass("active-button");
    restartGame();
}

function restartGame(){
    level = 0;
    gameStarted = false;
    boxColorChangeSpeed = 2990;
    timeUp = false;
    scoreCount = 0;
    
}

function difficultySelect(){
    level++;
    levelAnimation();
    $("#level > h2").text("Level " + level);
    if(level == 1){
        clearInterval(intervalId);
        boxColorChangeSpeed = 2490;
        intervalId = setInterval(chooseBox, boxColorChangeSpeed);
    }

    else if(level == 2){
        clearInterval(intervalId);
        boxColorChangeSpeed = 1990;
        intervalId = setInterval(chooseBox, boxColorChangeSpeed);
    }

    else if(level == 3){
        clearInterval(intervalId);
        boxColorChangeSpeed = 1490;
        intervalId = setInterval(chooseBox, boxColorChangeSpeed);
    }

    else if(level == 4){
        clearInterval(intervalId);
        boxColorChangeSpeed = 1090;
        intervalId = setInterval(chooseBox, boxColorChangeSpeed);
    }

    else if(level == 5){
        clearInterval(intervalId);
        boxColorChangeSpeed = 900;
        intervalId = setInterval(chooseBox, boxColorChangeSpeed);
    }
}

function levelAnimation(){
    $("#level > h2").addClass("blink");
    $("#level > h2").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
    setTimeout(()=>{
        $("#level > h2").removeClass("blink");
    }, 2000);
   
}


$("div").on("click", (e)=>{
    if($(e.target).hasClass("active-button")){
        clickSound.play();
        scoreCount+=100;
        $("#score > h2").text("Score " + (scoreCount));
        clearTimeout(timeoutId);
       $(e.target).removeClass("active-button");
    }
});

$(document).on("keydown", ()=>{
    if(!gameStarted){
        $("div").removeClass("lose-condition");
        $("h1").text("Click the Green Boxes To Stay Alive");
        $("#level > h2").text("Level " + level);
        gameInterval = setInterval(difficultySelect, 20000);
        intervalId = setInterval(chooseBox, boxColorChangeSpeed);
        intervalCheckLossId = setInterval(checkLoss, 100);
        $("#score > h2").text("Score " + (scoreCount));
        gameStarted = true;
    }
});

