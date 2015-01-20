Sherlock.User = DS.Model.extend({
  userName: DS.attr('string'),
  email: DS.attr('string'),
  userTodoList: DS.hasMany('userTodoList')
});

Sherlock.UserTodoList = DS.Model.extend({
  user : DS.belongsTo('user'),
  todo: DS.attr('string'),
  status: DS.attr('string'),
  whoCreated: DS.attr('string')
});