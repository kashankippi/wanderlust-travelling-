const { query } = require("express");
const Listing = require("../models/listing")
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient= mbxGeocoding({ accessToken: mapToken});

module.exports.index = async(req,res)=>{
    const allListings =  await Listing.find({});
    res.render("listings/index.ejs",{allListings});
  };


  module.exports.showlisting =  async (req,res)=>{
    let {id} = req.params;
   const listing = await Listing.findById(id)
   .populate({
    path: "reviews",
    populate:{
    path: "author",}
  })
  .populate("owner");
   if(! listing){
    req.flash("error", "Listing you requested for does't existed")
    res.redirect("/listings")
   }
    // console.log(listing)
   res.render("listings/show.ejs", { listing});
  
  };

  module.exports.editlisting =  async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
      if(! listing){
  req.flash("error", "Listing you requested for does't existed")
  res.redirect("/listings");
}
let originalImageUrl =  listing.Image.url;
originalImageUrl =   originalImageUrl.replace("/upload","/upload/w_200");
    res.render("listings/edit.ejs", {listing,originalImageUrl});
};

module.exports.updatelisting = async(req,res)=>{
    let {id} = req.params;
  let listing =  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  if( typeof req.file !== "undefined"){
  let url =  req.file.path;
  let filename = req.file.filename;
  listing.Image = {url, filename};
    await listing.save();
  };
 req.flash("success", " Listing updated successfully !");
 res.redirect(`/listings/${id}`);

};


module.exports.destroylisting = async(req,res)=>{
    let {id} = req.params;
    let dltData = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted ! ")
    console.log(dltData);
    res.redirect("/listings");
};

module.exports.creatlisting = async (req,res,next)=>{ 
  
 let response =  await geocodingClient
 .forwardGeocode({
    query:req.body.listing.location,
    limit: 1,
  })
  .send()


   let url =  req.file.path;
   let filename = req.file.filename;
   console.log(url, "-----------",filename);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.Image = {url, filename};

  newListing.geometry = response.body.features[0].geometry;
      await newListing.save();
      req.flash("success", "new listing created");
     res.redirect("/listings");
}


// --------------------------------------------------------------------------------------------------------


