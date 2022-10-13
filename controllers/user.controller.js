const userModel = require("../models/user.model");
const { farmModel } = require("../models/farm.model");

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

module.exports = { registerUser,signin };
