Sherlock.ProjectsRoute = Ember.Route.extend({
	model: function(params) {
    return this.store.find('project', params.project_id);
	}
});