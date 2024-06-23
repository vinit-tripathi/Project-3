let gameSeq = [];
let userSeq = [];
let scores = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let btns = ["yellow","red","purple","green"];

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game is started");
        started = true; //game sirf ek h baar start hoga
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}


function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    //random button choose
    let ranIdx = Math.floor(Math.random() * 3);
    let randColor = btns[ranIdx];
    //jo random color milraha h uppar se uske liye random button ki class bna lnge neeche
    let ranBtn = document.querySelector(`.${randColor}`);
    // console.log(randColor);
    // console.log(ranIdx);
    // console.log(ranBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(ranBtn); //btn flash har baar krna pdega islye function bna lnge
}
//uppar tak level 1 kaise aya aur button kaise flash hua humne itna kra 
//AB GAME WAIT KREGA KI KAISE HUM USI BUTTION KO PRESS KAREIN JISKO GAME NE FLASH KIYA THA ..ab hum baat krnge 
//ki event listener ko kaise add krnge hum button pe

//uske baad hum check krnge ki user ne jo button press kiya h wo yahi h using this
//fir hum us button ko flash krnge

function checkAns(idx) {
    // console.log("curr level", level)
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }

    }
    else{
        scores.push(level);
        console.log(scores);
        let maxScore = Math.max(...scores);
        console.log(maxScore);
        h2.innerHTML = `Game over! Your score was <b>${level} and highest score is ${maxScore}</b> <br> Press any key to start.`;
        
        
        // h2.innerText = `Your highest score is ${maxScore}`;
        
        
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white"; 
        }, 150)
        reset();
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}
//Note : ek baar agar game over hogya to game ko reset krna pdega

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}