const router = require('express').Router();
const validateEmail = require('validator/lib/isEmail');

router.post("/subscribe", (req, res) => {
  const emailId = req.query.emailId;
  console.log(emailId);
  if(validateEmail(emailId)) {
  	res.status(200).json({msg: 'Successfully added to mail list!'})
  }
  else {
  	res.status(400).json({msg: 'Invalid Email ID'})
  }
});

module.exports = router;
