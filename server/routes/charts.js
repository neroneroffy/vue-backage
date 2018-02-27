let express = require('express');
let router = express.Router();
let charts = require('../models/charts');
router.get('/',(req,res,next)=>{

    charts.find((err,doc)=>{
       if(err){
           return res.json({
               result:false
           })
       }

       return res.json({
           result:true,
           data:doc
       })
   })
});
module.exports = router;