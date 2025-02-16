const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 const Review = require("./reviews.js");
 const { string, required } = require("joi");
// const ObjectId = mongoose.Types.ObjectId;
// const newObjectId = new ObjectId();

 const listingSchema = new Schema ({
//     ObjectId: {type: Schema.Types.ObjectId,
     
//  },
    title:{
    type: String,
    required: true,
},
    description : String,
    Image: { 
       url: String,
       filename: String,
    },
    price: Number,
    location: String,
    country: String,
    
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry:{
        type: {
            type : String,
            enum: ['Point'],
            required: true,
        },
        coordinates:{
            type : [Number],
            required : true,
        }
    },
    
    category : {
        type: String,
      enum:["Mountaines","Arctic","Farm","Pool","Desert","Iconic-cities","Trending","Camping","Rooms","Castels",],
    }
   


 });

 listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }

 });
 
 const Listing = mongoose.model("Listing", listingSchema);

 module.exports = Listing;