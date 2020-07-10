var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE mentor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome text UNIQUE, 
            tecnologia text, 
            contato text, 
            CONSTRAINT nome_unique UNIQUE (nome)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO mentor (nome, tecnologia, contato) VALUES (?,?,?)'
                    db.run(insert, ["Jéssica", "React", "oskojess@gmail.com"])

                }
            });
    }
});


module.exports = db