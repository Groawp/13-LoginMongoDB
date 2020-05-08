// DBMongo User: duy - 1234

const router = require("express").Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
//Validation



router.post("/register", async (req, res) => {
  try {
    // Input validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check for duplicate email
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists.");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.send("Error happens !!");
  }
});

router.post("/login", async (req, res) => {
  // Input validation
  try {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email not found.");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("password wrong.");

    // Granting token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN);
    res.header('auth-token', token).send(token)

    console.log("Access granted");
  } catch (err) {
    res.send("Error happens !!");
  }
});

module.exports = router;
