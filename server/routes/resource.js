let express = require('express');
let router = express.Router();
let resource = require('../models/resource');

router.get('/getlist',(req,res,next)=>{
   resource.find({},(err,doc)=>{
       if(err){
           return res.json({
               result:false
           })
       }
       console.log(doc)
       return res.json({
           result:true,
           data:doc
       })
   })
});

module.exports = router;