var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var app        = express();
var port       = 3000;

var con = mysql.createConnection({
    host:     "localhost",
    user:     "root",
    password: "password",
    database: "mydb",
    insecureAuth: true
});

con.connect(function(err){
    if (err) throw err;
    console.log("Database connected");
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/profile', function(req, res){
    res.sendFile(path.join(__dirname + '/profile.html'));
});

app.post('/createProfile', function(req, res){
    res.sendFile(path.join(__dirname + '/create_profile.html'));
});

app.post('/login', function(req, res){
    res.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/submitProfileInfo', function(req, res){
    var firstname = req.body.First_Name;
    var lastname = req.body.Last_Name;
    var username = req.body.Username;
    var age = parseInt(req.body.Age);
    var sql = "INSERT INTO statbuilder (First_Name, Last_Name, Username, Age) VALUES ( '" + firstname + "', '" + lastname + "', '"
            + username + "', '" + age + "' )";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log('1 record inserted');
    });
    res.redirect('/');
});



app.listen(port, console.log('Server is running...'));