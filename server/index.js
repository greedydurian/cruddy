const express = require('express');
const app = express();

const bodyParser= require('body-parser');
const cors = require("cors");
const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "awesomeTEAM123",
    database: "crud"

});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.get("/api/get", (req,res) => {
//     const sqlGet = "SELECT * FROM contact_db";
//     db.query(sqlGet,(error,result) => {
//         res.send(result);
//     });
// });

app.get('/api/details', (req, res) => {
    db.query("SELECT distinct email, name FROM contact_db", (error, result) => {
        console.log("error", error);
        console.log("result",result);
        res.send(result)
    });
   
});

app.post('/api/create', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const uuid = req.body.uuid;
    db.query("INSERT INTO contact_db(name, email, contact, uuid) VALUES (?, ? , ?, ?)", [name, email, contact, uuid], (error, result) => {
        console.log("error", error);
        console.log("result", result)}
        );
} );

app.post('/api/createcard', (req, res) => {

    const email = req.body.email;
    const name = req.body.name;
    db.query("INSERT IGNORE INTO card_db(email, name) VALUES ( ? , ?)", [email, name], (error, result) => {
        console.log("error", error);
        console.log("result", result)}
        );
} );

app.post('/api/inputCardDetails', (req, res) => {

    const email = req.body.email;
    const name = req.body.name;
    const cardName = req.body.cardName;
    const company = req.body.company;
    const year = req.body.year;
    const type = req.body.type;
    const edition = req.body.edition;

    db.query("INSERT INTO card_details_db(email, name, cardName, company, year, type, edition) VALUES ( ? , ?, ? , ?, (STR_TO_DATE(?, '%Y')) , ?,?)", [email, name,cardName, company, year, type, edition], (error, result) => {
        console.log("error", error);
        console.log("result", result)}
        );
} );

app.listen(5000, ()=>{
    console.log('server is running on port 5000')
})
