Sherlock.Project = DS.Model.extend({
  projectName: DS.attr('string'),
  sprintCount: DS.attr('number'),
  sprintSlug: DS.attr('string'),
  cenarios: DS.hasMany('cenario', { async: true })
});

Sherlock.Cenario = DS.Model.extend({
	project: DS.belongsTo('project'),
	cenarioTitle: DS.attr('string'),
	cases: DS.hasMany('case', { async: true })
});

Sherlock.Case = DS.Model.extend({
	caseTitle: DS.attr('string'),
	expect: DS.attr('string'),
	status: DS.attr('number'),
	cenario: DS.belongsTo('cenario')
});