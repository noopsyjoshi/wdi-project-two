const Image = require('../models/image');

function commentsCreate(req, res) {
  Image
    .findById(req.params.imageId)
    .then(image => {
      image.comments.push(req.body);
      return image.save();
    })
    .then(image => res.redirect(`/images/${image.id}`)); //Back to image page
}

function commentsDelete(req, res, next) {
  Image
    .findById(req.params.imageId)
    .then(image => {
      const commentIdToDelete = req.params.commentId;
      //TODO: This should check that the user is the commenting user
      //gets commend id from the routes file and attaches it to the req
      console.log('comment id to delete', commentIdToDelete);
      console.log('this is the filter result', image.comments.filter(comment => comment.id !== commentIdToDelete));
      image.comments = image.comments.filter(comment => comment.id !== commentIdToDelete);
      return image.save();
    })
    .then(image => res.redirect(`/images/${image.id}`))
    .catch(next);
}

module.exports = {
  create: commentsCreate,
  delete: commentsDelete
};
