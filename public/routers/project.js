Sherlock.DashboardsRoute = Ember.Route.extend({
	model: function() {
    return this.store.find('project');
	}
});