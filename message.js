const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
  message: String
});

module.exports = mongoose.model('message', messageSchema);