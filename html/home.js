let para1 = document.createElement('p');
para1.innerText = "hi i am red";
document.querySelector('body').append(para1);

para1.classList.add("red");

let h3 = document.createElement('h3');
h3.innerText = "hi i am blue h3";
document.querySelector('body').append(h3);

h3.classList.add("blue");


 let div = document.createElement("div");
 let h1 = document.createElement("h1");
 let p2 = document.createElement("p2");
 h1.innerText = "i am inner div";
 p2.innerText = "me too";
 div.append(h1);
 div.append(p2);
 div.classList.add("box");
 document.querySelector('body').prepend(div);