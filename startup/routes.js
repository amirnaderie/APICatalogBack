const express = require('express');
//const menus = require('../routes/menus');
const menus = require('../routes/menus');
const apis = require('../routes/apis');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/menus', menus);
  app.use('/api/apis', apis);
  app.use(error);
}