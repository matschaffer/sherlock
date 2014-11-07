var restify = require('restify');
var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var sessions = require("client-sessions");

var server = restify.createServer({
    name: 'api.sherlock.v1',
    version: '0.1.0'
});


server.use(sessions({
	cookieName: 'sherlock_auth_session',
	secret: 'q8KY[82423BQ1;@D?!Ig}m{-41Y0}9DTxB90=N.7&BftM.28c}_9<W@RV5vl',
	duration: 24 * 60 * 60 * 1000,
	activeDuration: 1000 * 60 * 5
	cookie: {
		path: '/api',
		maxAge: 60000,
		ephemeral: false,
		httpOnly: true,
		secure: false
	}
}));


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Create a simple mongoose model 'Note'
var UserSchema = new mongoose.Schema({
	user : { type : String, required : true },
	email : { type : String, required : true },
	avatar : { type : String },
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


restifyMongoose(models.User).serve('/api/user', server);
restifyMongoose(models.Projects).serve('/api/project', server);
restifyMongoose(models.Cenarios).serve('/api/cenario', server);
restifyMongoose(models.Cases).serve('/api/case', server);


server.listen(3000, function () {
	console.log('%s listening at %s', server.name, server.url);
});