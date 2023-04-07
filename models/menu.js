const Joi = require('joi');
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    id: {
    type: Number,
    required: true,
    min: 0
  },
  Name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  }
});
const Menu = mongoose.model('Menu', menuSchema);

function validateMenu(menu) {
  const schema = {
    id: Joi.number().min(0).required(),
    Name: string().min(2).max(40).required()
    };

  return Joi.validate(menu, schema);
}

exports.menuSchema = menuSchema;
exports.Menu = Menu; 
exports.validate = validateMenu;