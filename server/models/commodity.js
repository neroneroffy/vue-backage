let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commodity = new Schema({
    "id":String,
    "name":String,
    "unit":String,
    "price":String,
    "weight":String
});
module.exports = mongoose.model('commoditys',commodity);