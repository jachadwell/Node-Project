var express       = require('express');
var mongoose      = require('mongoose');
var passport      = require('passport');
var passportSetup = require('./config/passport-setup');
var cookieSession = require('cookie-session');
var keys          = require('./config/keys');
var app           = express();
var port          = 3000;

//view engine
app.set('view engine', 'ejs');

//encrypt cookies for 1 day
app.use(cookieSession({
    // 1 day = 24 * 60 * 60 * 1000 miliseconds
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to database
mongoose.connect(keys.mondodb.dbURI, function(){
    console.log('Mongo DB connected...')
});

//importing routes
var authRouter    = require('./routes/auth-routes');
var profileRouter = require('./routes/profile-routes');

//setting up routes
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

//home page
app.get('/', function(req, res){
    res.render('index', {user: req.user});
});

app.listen(port, console.log('Server is running...'));