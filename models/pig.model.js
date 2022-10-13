const mongoose = require("mongoose");


const serviceSchema = mongoose.Schema({
    date: String,
    mateUID: String
})

const healthSchema = mongoose.Schema({
    diseaseSuspected: String,
    treatment: String, 
    healed: Boolean
})
const pigSchema = mongoose.Schema({
  pigAlias: { type: String },
  dob: { type: String },
  birthWeight: { type: [Number] },
 
  gender: { type: String },
  parentBoar: { type: String, required: true },
  parentSow: { type: String, required: true },
  farmUID: { type: String, required: true },
  service: [serviceSchema],
  health: [healthSchema],
  weightArray:[{date:{type:String}, weight:{type: Number}}]

});

const pigModel = mongoose.model("pig_collection", pigSchema);
module.exports = pigModel;
