const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const { object } = require("joi");

const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust" ;

main().then(()=>{
    console.log("connection to db")
}).catch(err=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongoUrl);
}

const initDB = async()=>{

   await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
    ...obj,
     owner: '66501d80778f15ed7fcb03c8'
    }));
   await Listing.insertMany(initData.data);
    console.log("data was saved");
};

initDB();


