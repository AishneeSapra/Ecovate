const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const plantationSchema = new Schema({
    PinCode:Number,
    PlotNumber:Number,
});
module.exports = mongoose.model('Plantation', plantationSchema);