const userModel = require("../models/user.model");
const { farmModel } = require("../models/farm.model");
const jwt = require("jsonwebtoken");
const pigModel = require("../models/pig.model");

const registerUser = (req, res) => {
  console.log(req.body);
  let {
    firstname,
    lastname,
    email,
    password,
    farmname,
    address,
    noOfPens,
    spatialSize,
    waterSource,
    waterAvailabilty,
    spatialUnit,
    waterPrivacy,
    waterSecurity,
  } = req.body;

  let farmObj = {
    farmname,
    address,
    noOfPens,
    spatialSize,
    waterAvailabilty,
    spatialUnit,
    waterSecurity,
    waterPrivacy,
    waterSource,
  };

  const farmForm = new farmModel(farmObj);

  farmForm.save().then((saved) => {
    let userObj = {
      firstname,
      lastname,
      email,
      password,
      farmID: `${saved._id}`,
    };
    let userForm = new userModel(userObj);
    userForm.save((err) => {
      if (err) {
        res.send({ status: false, message: "There was an error" + err });
      } else {
        res.send({ status: true, message: "Account Creations Successful" });
      }
    });
  });
};

const signin = (req, res) => {
    console.log(req.body);
    let { email, password } = req.body;
    userModel.findOne({email:email },(err, user) => {
        if (err) {
          res.send({
            status: false,
            message: "Internal Server Error, check internet",
          });
        } else {
          if (!user) {
            res.send({
              status: false,
              message: "Invalid Email",
            });
          } else {
            user.validatePassword(password, (err, same) => {
              if (err) {
                res.send({
                  status: false,
                  message: "Incorrect Password",
                });
              } else {
                if (!same) {
                  res.send({
                    message: "Check again, your password is wrong",
                    status: false,
                  });
                } else {
                  let secret = process.env.JWT_SECRET;
                  let sessionToken = jwt.sign({email}, secret);
                  res.send({
                    message: "Sign in successful",
                    status: true,
                    sessionToken,
                    id: user._id,
                  });
                }
              }
            });
          }
        }
      }
    );
};


const getDashboard = (req, res)=>{
  let secret = process.env.JWT_SECRET;
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: false, message: "error" });
    } else {
      let { email} = result;
      userModel.findOne(
        { email: email },
        (err, userDetails) => {
          if (err) {
            res.send({
              status: false,
              message: "There has been an error please try logging in again",
            });
          } else {

            farmModel.findOne({_id: userDetails.farmID},(err, farm)=>{
              if(err){
                res.send({
                  status: false,
                  message: "There has been an error finding farm please try logging in again",
                });
              }else{
                pigModel.find({farmUID: farm._id}, (err, allPigs)=>{
                  if(err){
                    res.send({
                      status: false,
                      message: "There has been an error finding pigs please try logging in again",
                    });
                  }else{
                    res.send({status:true, message: "All data has been found ", userDetails, farm, allPigs})
                  }
                })
              }
            })
            res.send({status:true, message: "User Authenticated Successfully", userDetails })
          }
        }
      );
    }
  });

}
module.exports = { registerUser,signin, getDashboard };
