const User = require('../models/user');

function registrationsNew(req, res) {
  // Render the registration form
  res.render('registrations/new');
}

function registrationsCreate(req, res) {
  User
    .create(req.body)
    .then((user) => {
      console.log('user created', user);
      req.session.userId = user.id;
      res.redirect('/index');
    })
    .catch(err => {
      console.log(err);
      for(const label in err.errors) {
        req.flash('warning', `${err.errors[label].message}`);
      }
      // req.flash('warning', `An error occured: ${err}!`);
      res.status(500).redirect('/registrations/new');
    }
    );
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
