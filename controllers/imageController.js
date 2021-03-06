const Image = require('../models/image');
const User = require('../models/image');

// Upload a new image and render the form
function imagesNew(req, res) {
  res.render('images/new');
}

// Function to upload the picture and redirect you back to your profile
function imagesCreate(req, res) {
  console.log('this is req.body before we add res =>', req.body);
  console.log('LOGGED IN USER  =>', res.locals.loggedInUser._id);
  console.log('res.body =>', res.body);
  req.body.createdBy = res.locals.loggedInUser._id;
  console.log('this is req.body =>', req.body);
  Image
    .create(req.body)
    .then(image => {
      console.log('Uploading image...', image);
      res.redirect(`/users/${res.locals.loggedInUser._id}`);
    })
    .catch(err => res.status(500).send(err));
}

function imagesShow(req, res) {
  const imageId = req.params.id;
  Image
    .findById(imageId)
    .populate('createdBy')
    .then(image => res.render('images/show', { image }));
}

function imagesEdit(req, res) {
  Image
    .findById(req.params.id)
    .then(image => res.render('images/edit', { image }))
    .catch(err => res.status(404).send(err));
}

function imagesUpdate(req, res) {
  //you want to use Image because that's the Model and you need it whenever you wanna make changes to the db
  Image
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect('/index'))
    .catch(err => res.status(500).send(err));
}

function imagesDelete(req, res) {
  Image
    .findByIdAndDelete(req.params.id)
    .then(() => res.redirect(`/users/${res.locals.loggedInUser._id}`))
    .catch(err => res.status(404).send(err));
}

// function imagesIndex(req, res) {
//   console.log('into the images index....');
//   Image
//   // Find all images
//     .find()
//     .then(image => res.render('images/index', { image }));
//     .catch(err => res.status(404).send(err));
// }

module.exports = {
  new: imagesNew,
  create: imagesCreate,
  show: imagesShow,
  edit: imagesEdit,
  update: imagesUpdate,
  delete: imagesDelete
};
