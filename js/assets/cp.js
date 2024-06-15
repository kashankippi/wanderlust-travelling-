// // // function svebd(data){
// // //     return new Promise((resolve, reject)=>{
// // //         let intspd = Math.floor(Math.random()*10)+1;
// // //         if( intspd>4){
// // //             resolve( " submit sucessfully");
// // //         }else{
// // //             reject("fail to submit");
// // //         }
// // //     });
// // // }
// // //  svebd("deep rana")
// // //  .then((result)=>{
// // //     console.log("resolved",result);
// // //     console.log(result);
// // //     return svebd ("kuldeep");
// // //  })
// // //  .then((result)=>{
// // //     console.log("resolved second acess",result);
// // //     console.log(result);
// // //     return svebd("sonu");
// // //  })
// // //  .then((result)=>{
// // //     console.log("data 3",result)
// // //     console.log(result);
// // //  })
// // //  .catch((error)=>{
// // //     console.log("rejected",error);
// // //     console.log(error);
// // //  });



// let h1 = document.querySelector("h1");

// function changeColor(color,delay){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             let num = Math.floor(Math.random()*5)+1;
//             if (num>3){
//                 reject("promoses rejected")
//             }
//             h1.style.color = color;
//             resolve("color changed");
//         },delay);
//     });
// }
//  async function cncol(){
//     try{
//         await changeColor("red",1000);

//         await changeColor("green",1000);
   
//        await changeColor( "yellow",1000);
   
//         await changeColor( "orange", 1000);
//     }catch(err){
//         console.log("erroe caughted!");
//         console.log(err);
//     }
    

//  };
//  cncol();





// // async function great(){
// //     return "hello";
// // }
// // let hello = async ()=>{
// //     return "deep rana"
// // };






let url = "https://catfact.ninja/fact";
async function  gettFact(){
    try{
        let res = await fatch(url);
        let data = await res.json();
        console.log(data.fact);

        let res2 = await fatch(url);
        let data2 = await res2.json();
        console.log(data2.fact);
    }
    catch (err){
console.log("error :", err);
    }
}
gettFact();
console.log("deep rana")


























