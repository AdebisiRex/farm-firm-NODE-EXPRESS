const pigModel = require("../models/pig.model");
const userModel = require("../models/user.model");
const { farmModel } = require("../models/farm.model");


const addAnimal = (req, res) => {
  let { id } = req.body;

  userModel.findOne({ _id: id }, (err, foundUser) => {
    let farmID = foundUser.farmID;
    farmModel.findOne({ _id: farmID }, (err, foundFarm) => {
      if (foundFarm) {
        let weight;
        let {
          pigAlias,
          dob,
          pigWeight,
          pigWeightUnit,
          gender,
          parentBoar,
          parentSow,
        } = req.body;
        
        if(pigWeightUnit == "G"){
           weight = Number(pigWeight)/1000; 
        }else if(pigWeightUnit == "Pounds"){
            weight = Number(pigWeight) * 0.454
        }else{
            weight = Number(pigWeight)
        }
        
        
        let pigForm = {
          pigAlias,
          dob,
          pigWeight: weight,
          gender,
          parentBoar,
          parentSow,
          farmUID: foundFarm._id,
        };


        let form = new pigModel(pigForm);
        form.save((err) => {
          if (err) {
            res.send({
              status: false,
              message: "Error saving file, check again",
            });
          } else {
            res.send({ status: true, message: "Animal added successfully." });
          }
        });
      }
    });
  });
};

module.exports = {addAnimal}