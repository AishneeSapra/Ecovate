const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EcoFriendlyWordSchema = new Schema({
    word: String
});

module.exports = mongoose.model('EcoFriendlyWord', EcoFriendlyWordSchema);