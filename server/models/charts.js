var mongoose = require('mongoose');
var chartsData = new mongoose.Schema({
    "yearSaleData":{
        "dataPrev":Array,
        "dataNow":Array
    }
});
module.exports = mongoose.model("charts",chartsData);