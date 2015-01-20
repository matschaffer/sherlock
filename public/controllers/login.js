Sherlock.LoginController = Ember.Controller.extend({
loginModal: true,
actions: {
	showForgotPasswordForm: function() {
		this.set('loginModal', false)
	},
	showLoginModal: function(){
		this.set('loginModal', true)	
	}
}
});