var router = require('express').Router();

var authCheck = function(req, res, next){
    if(!req.user){
        // if user is not logged in
        res.redirect('/auth/login');
    } else{
        // if logged in
        next();
    }
};

router.get('/', authCheck, function(req, res){
    res.render('profile', { user: req.user });
});

module.exports = router;