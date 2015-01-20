Sherlock.DashboardsRoute = Ember.Route.extend({
	model: function() {
    return this.store.find('project'); //here we find everything in DS.Store instance which is FIXTURE catalog
	}
});