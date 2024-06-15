let gameseq=[];
let userseq=[];
let btns = ["yellow", "green","red","purple"];

let start = false;
 let level = 0;
 let highscr = 0;

  let h3 = document.createElement("h3");
 
let h2 = document.querySelector("h2");
h2.insertAdjacentElement("afterend",h3);

document.addEventListener("keypress",function(){
 if(start==false){
    console.log("game is start");
    start= true;    
    levelup();
 }
}); 
function btnFlash(btn){
btn.classList.add("userflash");
setTimeout(function(){
    btn.classList.remove("userflash");
},250);
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function levelup(){
    userseq = [];
level++;
h2.innerText= `Level ${level}`;
h3.innerText = `High Score = ${highscr+1}`;

if(level>highscr){
    highscr = level;
}else{
    highscr = highscr;
}

let randIdx = Math.floor(Math.random()*3);
let randColor = btns[randIdx];
let randBtn = document.querySelector(`.${randColor}`);
// console.log(randIdx);
// console.log(randColor);
// console.log(randBtn);
gameseq.push(randColor);
console.log(gameseq);
gameFlash( randBtn);
}


function checkAns(idx){
    // console.log("current level:",level);

    if(userseq[idx]===gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelup,1000);
        }
        
       
    }else{
        h2.innerHTML = `Game over! your score was<b>${level}</b><br> press any key to start.`;
        document.querySelector("body").style.backgroundColor= "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor= "white";
        },150);
        reset();
    }
}

function btnPress(){ 
    let btn = this;
    btnFlash(btn)

    userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length-1);
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
btn.addEventListener("click",btnPress);
};
function reset(){
    start = false;
    gameseq =[];
    userseq =[];
    level= 0;
};






