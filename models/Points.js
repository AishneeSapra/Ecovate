
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointsSchema = new Schema({
    username: String,
    totalPoints: { type: Number, default: 0 } // Default total points to 0
});
module.exports = mongoose.model('Point', pointsSchema);