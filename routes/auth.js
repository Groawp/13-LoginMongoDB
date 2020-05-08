// DBMongo User: duy - 1234

const router = require("express").Router();
const User = require("../model/user");
const {registerValidation} = require('../validation')
//Validation


router.post("/register", async (req, res) => {
    // Input validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // Check for duplicate email
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.status(400).send("Email already exists.")
    //Create new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const savedUser = await user.save();
    res.send([savedUser,{update: "Success"}]);
});

router.post("/test", (req, res) => {
  res.send("Approved");
});

module.exports = router;
