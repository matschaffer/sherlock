Sherlock.UsersRoute = Ember.Route.extend({
	model: function() {
    return this.store.find('user'); //here we find everything in DS.Store instance which is FIXTURE catalog
	}
});