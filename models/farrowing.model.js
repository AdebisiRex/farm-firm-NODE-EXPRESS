const mongoose = require("mongoose");

const farrowingSchema = mongoose.Schema({
  sowUID: { type: String, required: true },
  mateUID: { type: String, required: true },
  offSprings: { boar: String, sow: { type: String }, dead: { type: String } },
  date: {type: String, default: Date.now()},
});

const farrowingModel = mongoose.model("farrowing_history", farrowingSchema)

module.exports= {farrowingSchema, farrowingModel}