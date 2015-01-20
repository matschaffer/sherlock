Sherlock.DashboardRoute = Ember.Route.extend({
	model: function(params) {
    return this.store.find('project');
	}
});