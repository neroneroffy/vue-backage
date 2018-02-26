let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let resource = new Schema({
    id:String,
    name:String,
    path:String,
    status:Boolean,
    type:String
});
module.exports = mongoose.model("resources",resource);