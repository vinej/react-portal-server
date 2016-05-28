const Authentication = require('./controllers/authentication');
const Todo = require('./controllers/todo');
const Action = require('./controllers/action');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res, next) {
    res.send({ message: 'Super secret code is ABC123' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.post('/action', Action.action);
  app.get('/users', Authentication.users);
  app.get('/todos', requireAuth, Todo.query);
  app.get('/todos/:id', requireAuth, Todo.one);
  app.post('/todos', requireAuth, Todo.add);
  app.put('/todos', requireAuth, Todo.update);
  app.delete('/todos/:id', requireAuth, Todo.delete);
}
