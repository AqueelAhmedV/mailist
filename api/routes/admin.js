const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const passport = require('passport')

const keys = require('../../config/keys')
const db = require('../../database')


router.post('/login', (req, res) => {
	db.all(`SELECT password FROM admin WHERE name="${req.body.name}"`, (err, data) => {
		if(err) {
			console.log(err)
			res.status(400).json({msg: "Specified Admin not registered"})
		} else {
			// console.log(data)
			bcrypt.compare(req.body.password, data[0].password)
			.then((isMatch) => {
				if(isMatch) {
					console.log("password match")
					const payload = {
						name: req.body.name,
						secret: keys.secretOrKey,
						passLen: data[0].password.length
					}
					jwt.sign(payload, keys.secretOrKey, {expiresIn: 21600}, (err, token) => {
						if(err) console.log(err);
						res.json({success:true ,token: `Bearer ${token}`})
					})
				} else {
					console.log('password incorrect')
					return res.status(400).json({msg: "Password incorrect"})
				}
			})
		}
		// bcrypt.compare(inputPassword, )
	})
})

router.get('/sublist', passport.authenticate("jwt", {session:false}), (req, res) => {
	db.all('SELECT * from UC_sublist', (err, data) => {
		if(err)
			return res.status(404).json(err)
		else 
			return res.status(200).json({sublist: data})
	})
})

router.post('/sublist/delete', passport.authenticate("jwt", {session:false}), (req, res) => {
	db.run(`DELETE FROM UC_sublist WHERE id=${req.query.id}`, (err, data) => {
		if(err)
			return res.status(404).json(err)
		else
			return res.status(204).json({deleted: true})
	})
})

module.exports = router;