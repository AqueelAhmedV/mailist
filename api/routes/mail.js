const router = require("express").Router();
const validateEmail = require("validator/lib/isEmail");
const db = require("../../database");

router.post("/subscribe", (req, res) => {
  const emailId = req.query.emailId;
  console.log(emailId);
  if (validateEmail(emailId)) {
    // console.log("valid");
    var insert = "INSERT INTO UC_sublist (name, email) VALUES (?,?)";
    db.run(insert, [req.query.name, emailId], (err) => {
      if (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
          res.status(409).json({ msg: "Email ID already exists" });
          console.log("Email already exists");
          return;
        }
        console.log(err);
      } else {
        res.status(200).json({ msg: "Successfully added to mail list!" });
        db.all("select email from UC_sublist", (err, data) => {
          if(err) {
            console.log(err)
            return
          }
          else {
            console.log(data);
          }
        });

      }
      
    });
  } else {
    // console.log("invalid");
    res.status(400).json({ msg: "Invalid Email ID" });
  }
});



module.exports = router;
