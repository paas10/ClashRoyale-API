const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  img: {
    type: String,
    required: false
  },
  nombre: {
    type: String,
    required: true
  },
  calidad: {
    type: String,
    required: true
  },
  tipoCarta: {
    type: String,
    required: true
  },
  vida: {
    type: Number,
    required: true
  },
  danio: {
    type: Number,
    required: true
  },
  velocidad: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('cards', cardSchema);