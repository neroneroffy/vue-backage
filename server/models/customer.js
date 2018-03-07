let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let customer = new Schema({
    "customerName":String,
    "customerType":String,
    "mobilePhone":String,
    "telephone":String,
    "wechat":String,
    "firstPurchaseTime":String,
    "status":String,
    "user":String,
    "address":String,
    "pic":String
});
module.exports = mongoose.model('customers',customer);