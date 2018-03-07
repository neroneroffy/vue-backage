let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let warehouse = new Schema({
    "id":String,
    "name":String,
    "max":String,
    "min":String,
    "contact":String,
    "phone":String,
    "address":String,
    "status":Boolean
});
module.exports = mongoose.model('warehouses',warehouse);