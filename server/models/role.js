let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let role = new Schema({
    roleId:String,
    roleName:String,
    roleCode:String,
    remark:String
});
module.exports = mongoose.model('roles',role);