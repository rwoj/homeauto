var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./dbdata/rules.db');
// const db = new sqlite.Database(':memory');

var rulesFileInitial = require('./rules');

db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS rules (id INTEGER, idLokalu INTEGER, nazwa TEXT, tempNast TEXT, startHr TEXT, czasMin TEXT, dni0 INTEGER, dni1 INTEGER, dni2 INTEGER, dni3 INTEGER, dni4 INTEGER, dni5 INTEGER, dni6 INTEGER, address INTEGER, value INTEGER)");
    var stmt = db.prepare("INSERT INTO rules (id, idLokalu, nazwa, tempNast, startHr, czasMin, dni0, dni1, dni2, dni3, dni4, dni5, dni6, address, value) VALUES ($id, $idLokalu, $nazwa, $tempNast, $startHr, $czasMin, $dni0, $dni1, $dni2, $dni3, $dni4, $dni5, $dni6, $address, $value)");
    rulesFileInitial.map(x=>{
        stmt.run(x.id, x.idLokalu, x.nazwa, x.tempNast, x.startHr, x.czasMin, x.weekday[0], x.weekday[1], x.weekday[2], x.weekday[3], x.weekday[4], x.weekday[5], x.weekday[6], x.address, x.value);
    })
    stmt.finalize();     
    db.all("select * from rules", (err, res) => console.log(res));  
});

db.close();