const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const participateSchema=new Schema({
    name:String,
    PinCode:Number,
    PlotNumber:Number,
});
module.exports=mongoose.model("Participant",participateSchema);