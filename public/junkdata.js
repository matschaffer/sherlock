Sherlock.Project.FIXTURES = [{
  id: '1',
  sprintCount: '1',
  sprintSlug: 'masseffect',
  projectName : 'My Awesome project',
  cenarios: [1,2]}
];
Sherlock.Cenario.FIXTURES = [
    {id: '1',
    cenarioTitle: 'As i user i want to access the application with my personal creditials',
    cases: [1,2,3,4]},
    {id: '2',
    cenarioTitle: 'As i user i want to leave the application so no one else can acess it',
    cases: [5,6,7,8]}
];
  Sherlock.Case.FIXTURES = [
        {id: '1', caseTitle: " Access the application with a valid user and password", expect: "It should login", status: 1, cenario: 1},
        {id: '2', caseTitle: " Access the application with a invalid user and password", expect: " check the invalid user error msg" ,status: 0 ,cenario: 1},
        {id: '3', caseTitle: " Access the application with a blank user and password", expect: "check the blank user error msg",status: 0, cenario: 1},
        {id: '4', caseTitle: " Access the application with a blocked user and password", expect: "check the block user error msg",status: 0, cenario: 1},
        {id: '5', caseTitle: " Logoff the application", expect: "It should logoff",status: 0, cenario: 2},
        {id: '6', caseTitle: " Valid the Timeout time", expect: "check timeout msg and it need to login again",status: 0, cenario: 2},
        {id: '7', caseTitle: " Check cross tab session", expect: "Others Tabs cant hold session",status: 0, cenario: 2},
        {id: '8', caseTitle: " Check cross browser session", expect: "Other Browsers should retain the session",status: 0, cenario: 2}
];

Sherlock.User.FIXTURES =[{
  id : '1',
  userName : 'Bugmaster',
  email : 'leo@keeptesting.com.br',
  userTodoList : [1,2,3]
}];

Sherlock.UserTodoList.FIXTURES =[
  {id : '1', user :'1', todo: 'Test the Awsome Project', status: 'to do', whoCreated: ''},
  {id : '2', user :'1', todo: 'Check those nasty bugs i found on cenario 2', status: 'to do', whoCreated: ''},
  {id : '3', user :'1', todo: 'I need the steps for the Gherkin Code ASAP!', status: 'to do', whoCreated: 'BOSS'}
];