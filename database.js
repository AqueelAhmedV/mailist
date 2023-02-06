var sqlite3 = require("sqlite3").verbose();
const bcrypt = require('bcryptjs')
const keys = require('./config/keys')

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log("Connected to the SQLite database.");
        db.run(
            `CREATE TABLE admin (
            name text UNIQUE,
            password CHAR(10)
            )`,
            (err) => {
                if (err) {
                    //console.log(err)
                    console.error("Admin table already exists");
                } else {
                    console.log("Admin Table created");
                }
            }
        );

        // bcrypt.genSalt(10, (err, salt) => {
        //     bcrypt.hash(keys.adminPass, salt, (err, hash) => {
        //         if (err) console.log(err);
        //         db.run(
        //             "INSERT INTO admin (name, password) VALUES (?,?)",
        //             ["FeliQ", hash],
        //             (err) => {
        //                 if (err) {
        //                     if (err.code === "SQLITE_CONSTRAINT") {
        //                         console.log("Admin duplicate prevented");
        //                         return;
        //                     }
        //                     console.log(err);
        //                 } else {
        //                     db.run("DELETE from UC_sublist", (err) => {
        //                         console.log("Subscriber list cleared", err);
        //                     });
        //                     console.log("Database Initialized");
        //                 }
        //             }
        //         );
        //     });
        // });

        db.run(
            `CREATE TABLE UC_sublist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.error("Table already created");
                } else {
                    // Table just created, creating some rows
                    console.log("Table created!");
                }
            }
        );
    }
});

module.exports = db;
