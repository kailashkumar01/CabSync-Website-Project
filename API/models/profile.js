const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Profile', profileSchema);
