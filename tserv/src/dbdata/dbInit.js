var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./src/dbdata/rules.db');
// const db = new sqlite.Database(':memory');

var rulesFileInitial = require('./rules');

db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS rules (id INTEGER, idLokalu INTEGER, nazwa TEXT, startT TEXT, endT TEXT, dni0 INTEGER, dni1 INTEGER, dni2 INTEGER, dni3 INTEGER, dni4 INTEGER, dni5 INTEGER, dni6 INTEGER, address INTEGER, value REAL, temp INTEGER)");
    var stmt = db.prepare("INSERT INTO rules (id, idLokalu, nazwa, startT, endT, dni0, dni1, dni2, dni3, dni4, dni5, dni6, address, value, temp) VALUES ($id, $idLokalu, $nazwa, $startT, $endT, $dni0, $dni1, $dni2, $dni3, $dni4, $dni5, $dni6, $address, $value, $temp)");
    rulesFileInitial.map(x=>{
        stmt.run(x.id, x.idLokalu, x.nazwa, x.startT, x.endT, x.weekday[0], x.weekday[1], x.weekday[2], x.weekday[3], x.weekday[4], x.weekday[5], x.weekday[6], x.address, x.value, x.temp);
    })
    stmt.finalize();     
    db.all("select * from rules", (err, res) => console.log(res));  
});

db.close();