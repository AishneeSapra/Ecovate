const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ActivitySchema = new Schema({
    title: String,
    image:String,
    description: String,
});
module.exports = mongoose.model('Activity', ActivitySchema);