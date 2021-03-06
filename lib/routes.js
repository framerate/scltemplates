'use strict';
var setupFacebook = require('./setupFacebook.js');

function requireAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/');
    }
}

module.exports = function(app)
{
	// setup facbeook login
	setupFacebook(app);

	// index/root view
	app.get('/', function(req, res) {
		// console./log(req.flash('info')[0]);
		res.render('index.ejs');
	});

	// logout to clear the sessions
	app.get('/logout', function(req, res) {
        req.session.destroy();
        req.user = null;
        res.locals.user = null;
        res.redirect('/');
    });

	// restricted "home" view
	app.get('/home', requireAuth, function(req, res){
		res.render('home.ejs', {user: req.user});
	});
};
