const mongoose = require("mongoose");

const farmSchema=mongoose.Schema({
    farmname: { type: String, required: true },
    address: { type: String, required: true },
    spatialSize: {type: String, required:true}, 
    spatialUnit: {type: String, required:true}, 
    noOfPens: {type: Number, required:true},
    waterSource: String,
    waterAvailability: {type:Boolean, default:false, immutable: false},
    waterSecurity: {type:Boolean, default:false, immutable: false},
    waterPrivacy: {type:Boolean, default:false, immutable: false},
})

const farmModel = mongoose.model("farm_details", farmSchema)
module.exports={farmModel, farmSchema}