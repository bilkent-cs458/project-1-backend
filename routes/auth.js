var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    status: "OK",
    message: "Welcome to the Verification Project 1 API!"
  })
});

router.post("/login", (req, res, next) => {

  let sentEmail = req.body.email
  let sentPassword = req.body.password

  let db = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./db.json")))

  if (sentEmail === undefined || sentPassword === undefined || sentEmail === "" || sentPassword === "" ) {
    res.status(400).json({
      status: "Error",
      message: "The email or password field was not filled."
    })
  }

  let found = false;

  db.forEach(({email, password}) => {
    if (sentEmail === email && sentPassword === password) {
        found = true;
    }
  })

  if (found) {
    return res.status(200).json({
      status: "OK",
      message: "Login succeeded."
    })
  } else {
    return res.status(401).json({
      status: "Error",
      message: "Please check you credentials."
    })
  }

})

module.exports = router;
