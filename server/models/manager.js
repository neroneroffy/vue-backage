let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let manager = new Schema({
    "id":String,
    "account":String,
    "pwd":String,
    "avatar":String,
    "roleId":String,
    "roleName":String,
    "phone":String,
    "status":Boolean
});
module.exports = mongoose.model('managers',manager);