let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let supplier = new Schema({
    "id":String,
    "name":String,
    "max":String,
    "min":String,
    "contact":String,
    "status":Boolean
});
module.exports = mongoose.model('suppliers',supplier);