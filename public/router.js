Sherlock.Router.map(function(){
	this.resource('login', {path: '/'});
	this.resource('dashboard', {path: '/dashboard'});
	this.resource('projects', {path: '/projects'});
	this.resource('project', {path: '/project/:project_id'});
	this.resource('users', {path: '/users'});
	this.resource('user', {path: '/user/:user_id'});
});