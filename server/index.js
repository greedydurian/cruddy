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
    const uuid = req.body.uuid;
    db.query("INSERT INTO card_details_db(email, name, cardName, company, year, type, edition, uuid) VALUES ( ? , ?, ? , ?, (STR_TO_DATE(?, '%Y')) , ?,?, ?)", [email, name,cardName, company, year, type, edition, uuid], (error, result) => {
        console.log("error", error);
        console.log("result", result)}
        );
} );

app.get('/api/inputCardDetails/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  // Search for the person with the given UUID in the array of people
  db.query("SELECT cardName FROM card_details_db WHERE uuid = ?", uuid, (error, result) => {
    console.log("error", error);
    console.log("result", result);
    res.send(result)
    }
    );
} );


app.get('/api/allCardDetails/', (req, res) => {
   
    db.query('SELECT email, name, type FROM card_details_db',
     (error, result) => {
      console.log("error", error);
      console.log("result",result);
      res.send(result)
    });
  });


//login
const users = {
    alice: {
      username: 'alice',
      password: 'password123'
    }
  };
  
  // Route for logging in
app.post('/api/login', (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;
  
    // Check if the username and password are valid
    const user = users[username];
    if (user && user.password === password) {
      // If the username and password are correct, send the user object as a response
      res.json({ user });
    } else {
      // If the username and password are incorrect, return a 401 error
      res.status(401).send('Incorrect username or password');
    }
  });

app.listen(5000, ()=>{
    console.log('server is running on port 5000')
})
