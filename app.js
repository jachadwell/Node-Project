const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const port = 3000;

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/profile', function(req, res){
    res.sendFile(path.join(__dirname + '/profile.html'));
});

app.get('/create_profile', function(req, res){
    res.sendFile(path.join(__dirname + '/create_profile.html'));
});

app.listen(port, console.log('Server is running'));