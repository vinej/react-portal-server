const Authentication = require('./controllers/authentication');
const checkAutorization = require('./autorization')

const Todo = require('./controllers/todo');
const Emit = require('./controllers/emit');
const Action = require('./controllers/action');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res, next) {
    res.send({ message: 'Super secret code is ABC123' });
  });
  app.post('/auth/signin', requireSignin, Authentication.signin);
  app.post('/auth/signup', Authentication.signup);

  app.post('/wss/emit', Emit.emit);

  app.all('/api/*', requireAuth, checkAutorization);

  app.get('/api/actions', Action.actions);
  app.get('/api/widgets', Todo.query);
  app.get('/api/users', Authentication.users);
  app.get('/api/todos', Todo.query);
  app.get('/api/todos/:id', Todo.one);
  app.post('/api/todos', Todo.add);
  app.put('/api/todos', Todo.update);
  app.delete('/api/todos/:id', Todo.delete);
}
