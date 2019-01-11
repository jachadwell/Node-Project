var router = require('express').Router();
var passport = require('passport');

//render the login page
router.get('/login', function(req, res){
    res.render('login');
});

router.get('/logout', function(req, res){
    req.logOut();
    res.redirect('/');
});

router.get('/google',
    passport.authenticate('google', { scope: ['profile']}));

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), function(req, res){
        res.redirect('/profile');
});

module.exports = router;