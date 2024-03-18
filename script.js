var btn = document.querySelector("button");
var screen = document.querySelectorAll(".screen");
var allInsect = document.querySelectorAll(".insect");
var playground = document.querySelector("#playground");
var select = "";
var scoreVal = document.querySelector(".timescore h5 span");
var score = 0;
var timerElement = document.querySelector(".timescore h6 span");
var timer = 60; 
var gameInterval; 

btn.addEventListener("click", function () {
    screen[1].style.transform = "translateY(-100%)";
});

allInsect.forEach(function (elem) {
    elem.addEventListener("click", function () {
        console.log(elem.childNodes[3].textContent);
        screen[2].style.transform = "translateY(-200%)";
        select = elem.childNodes[1].getAttribute("src");

        
        clearInterval(gameInterval);

        
        gameInterval = setInterval(function () {
            if (timer > 0) {
                timer--;
                updateTimerDisplay();
                createImg();
            } else {
                stopGame();
            }
        }, 1000);
    });
});

function createImg() {
    if (timer > 0) {
        var newImg = document.createElement("img");
        var x = Math.random() * 80;
        var y = Math.random() * 80;
        var rot = Math.random() * 360;

        newImg.setAttribute("src", select);
        newImg.style.position = "absolute";
        newImg.style.left = x + "vw";
        newImg.style.top = y + "vh";
        newImg.style.transform = "rotate(" + rot + "deg)";
        newImg.style.width = "50px";

        playground.appendChild(newImg);

        imgCatch();

        setTimeout(function () {
            newImg.style.visibility = "hidden";
            playground.removeChild(newImg);
        }, 1500);
    }
}

function imgCatch() {
    var images = document.querySelectorAll("#playground img");
    images.forEach(function (elem) {
        elem.addEventListener("click", function () {
            score++;
            scoreVal.innerHTML = score;
        });
    });
}

function stopGame() {
    clearInterval(gameInterval);
    document.querySelector("#playground").innerHTML = `<h1>Game Over</h1>`;
}

function updateTimerDisplay() {
    var minutes = Math.floor(timer / 60);
    var seconds = timer % 60;
    timerElement.innerHTML = `${minutes}:${seconds}`;
}

