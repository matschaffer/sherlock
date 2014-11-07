var restify = require('restify');
var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var passport = require("passport");
var PassportLocalStrategy = require('passport-local');
var Hash = require('password-hash');
var sessions = require("client-sessions");

var server = restify.createServer({
	name: 'api.sherlock.v1',
	version: '0.1.0'
});

//######
//not sure if im gonna use the client-sessions.. im already using passport...
server.use(sessions({
	cookieName: 'sherlock_auth_session',
	secret: 'q8KY[82423BQ1;@D?!Ig}m{-41Y0}9DTxB90=N.7&BftM.28c}_9<W@RV5vl',
	duration: 24 * 60 * 60 * 1000,
	activeDuration: 1000 * 60 * 5
	cookie: {
		path: '/api/notusingitnow',
		maxAge: 60000,
		ephemeral: false,
		httpOnly: true,
		secure: false
	}
}));
//####


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Create a simple mongoose model 'Note'
var UserSchema = new mongoose.Schema({
	name : { type : String, required : true },
	email : { type : String, required : true },
	avatar : {  type : String },
	password: { type: String, required : true , set: function(newValue) {
		return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
	} },
	projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

var ProjectSchema = new mongoose.Schema({
	name : { type : String, required : true },
	owner: { type : String, ref: 'User' }
	cenarios : [{ type: Schema.Types.ObjectId, ref: 'Cenarios' }]
});

var CenariosSchema = new mongoose.Schema({
	name : { type : String, required : true },
	project: { type : String, ref: 'Project' }
	cases : [{ type: Schema.Types.ObjectId, ref: 'Cases' }]
});

var CasesSchema = new mongoose.Schema({
	name : { type : String, required : true },
	cenario: { type : String, ref: 'Cenario' }
});

var User = mongoose.model('user', UserSchema);
var Projects = mongoose.model('project', ProjectSchema);
var Cenarios = mongoose.model('cenario', CenariosSchema);
var Cases = mongoose.model('case', CasesSchema);


UserSchema.statics.authenticate = function(email, password, callback) {
	this.findOne({ email: email }, function(error, user) {
		if (user && Hash.verify(password, user.password)) {
			callback(null, user);
		} else if (user || !error) {
			// Email or password was invalid (no MongoDB error)
			error = new Error("Your email address or password is invalid. Please try again.");
			callback(error, null);
		} else {
			// Something bad happened with MongoDB. You shouldn't run into this often.
			error = new Error("Seems like the database is not working?");
			callback(error, null);
		}
	});
};


var authStrategy = new PassportLocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, done) {
	User.authenticate(email, password, function(error, user){
		message = 'logged on!'
		done(error, user, error ? { message: error.message } : null);
	});
});

var authSerializer = function(user, done) {
	done(null, user.id);
};

var authDeserializer = function(id, done) {
	User.findById(id, function(error, user) {
		done(error, user);
	});
};

passport.use(authStrategy);
passport.serializeUser(authSerializer);
passport.deserializeUser(authDeserializer);


// ROUTES 
restifyMongoose(models.User).serve('/api/secure/user', server);
restifyMongoose(models.Projects).serve('/api/secure/project', server);
restifyMongoose(models.Cenarios).serve('/api/secure/cenario', server);
restifyMongoose(models.Cases).serve('/api/secure/case', server);


server.post('/api/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));



server.listen(3000, function () {
	console.log('%s listening at %s', server.name, server.url);
});