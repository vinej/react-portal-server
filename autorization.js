var checkAutorization = function(req, res, next) {
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

    // IT'S NOT IMPLEMENTED YET, FOR NOW ONLY SHOWS AT THE CONSOLE
    // THE INFORMATION THAT WILL BE USED TO CHECK THE SECURITY
    console.log(email, req.method, req.url, req.user.project, req.user.language);

    return next(null);
  } else {
    return next('Error: user object is null');
  }
}
module.exports = checkAutorization;