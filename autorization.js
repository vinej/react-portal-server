var checkAutorization = function(req, res, next) {
  // req.user.eamil contains theeamil of the user
  // we need a mapping between the
  // name of the route, the verb and the data
  // req.user.email
  // req.method : "Get/Post/Put/Delete"
  // req.url :    "/entity"
  if (req.user) {
    email = req.user.email
    if (req.query.project) {
      req.user.project = req.query.project
    } else {
      req.user.project = 'all'
    }
    if (req.query.language) {
      req.user.language = req.query.language
    } else {
      req.user.language = 'en'
    }

    // build an action with the following information
    //   email, req.method, req.url 
    // use a mapping or an algorithme
    console.log(email, req.method, req.url, req.user.project, req.user.language);

    return next(null);
  } else {
    return next('Error: user object is null');
  }
}

module.exports = checkAutorization;