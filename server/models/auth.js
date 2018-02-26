let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let auth = new Schema({
    "pid":String,
    "alreadyAuth":Array,
    "data":[
        {
            "title":String,
            "id":String,
            "children":[
                {
                    "title":String,
                    "id":String,
                    "children":[
                        {
                            "title":String,
                            "id":String,
                        }
                    ]
                }
            ]
        }
    ]
});
module.exports = mongoose.model('auths',auth);