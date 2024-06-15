const max= prompt("enter a max number");

const random = Math.floor(Math.random()*max)+1;
console.log(random);
let guess = prompt("guess the number")
while(true){
    if (guess == "quit"){
        console.log("user quit");
        break;
    }if(guess == random){
        console.log("you are right! congratulations!",random)
        break;
    }else if(guess<random){
        guess=prompt(" HINT: your guess was small. please try again");
    }else{
        guess=prompt("HINT: your guess was large. please try again");
    }
}