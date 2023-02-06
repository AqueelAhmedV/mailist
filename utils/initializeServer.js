const db = require("../database");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");

module.exports = () => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(keys.adminPass, salt, (err, hash) => {
			if (err) console.log(err);
			db.run(
				"INSERT INTO admin (name, password) VALUES (?,?)",
				["FeliQ", hash],
				(err) => {
					if (err) {
						if (err.code === "SQLITE_CONSTRAINT") {
							console.log("Admin duplicate prevented");
							return;
						}
						console.log(err);
					} else {
						db.run('DELETE from UC_sublist', (err) => {
							console.log('Subscriber list cleared', err)
						})
						console.log("Database Initialized");
					}
				}
			);
		});
	});
};

