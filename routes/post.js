const router = require("express").Router();
const verify = require("./verifyToken")

console.log("Someone loggin")
router.get('/', verify, (req, res) => {
    //res.json({post: "My first post", desc: "Random data2"})
    res.send(req.user)
    User.findbyOne
})
//Validation

module.exports = router