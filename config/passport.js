const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const db = require('../database')
const keys = require('../config/keys')

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			db.all("select * from UC_sublist", (err, data) => {
				if(err) {
					console.log(err)
					return done(null, false)
				}
				else {
					return done(null, data)
				}
			})
			
		})
	)
}
