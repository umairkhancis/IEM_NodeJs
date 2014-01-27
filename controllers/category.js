

var db = require('../models')

exports.create = function (req, res) {

};

exports.read = function (req, res) {
    db.category.find(req.param('id'))
    .success(function(category) {
      res.json(category);
  })
};
exports.update = function (req, res) {
  // ...
  res.send('user updated');
};
exports.del = function (req, res) {
  db.category.find(req.param('id'))
    .success(function(category) {
        category.destroy().success(function() {
            res.send('category deleted');
        })
  })
};
exports.index = function (req, res) {
  db.category.findAll({
  }).success(function(categories) {
    res.json(categories);
  })
};