let express = require('express');
let router = express.Router();
let customer = require('../models/customer');
router.get('/getList',(req,res,next)=>{
    let pageNum = parseInt(req.param('pageNum'));
    let pageSize = parseInt(req.param('pageSize'));
    let skip = (pageNum-1)*pageSize;

    let total = 0;
    customer.find({}).skip(skip).limit(pageSize).exec((err,doc)=>{
        if(err){
            return res.json({
                result:false
            })
        }
        let result = doc;
        customer.find({},(err,doc)=>{
            if (err){
                return res.json({
                    result:false
                })
            }
            return res.json({
                result:true,
                list:result,
                total:doc.length
            })
        })

    })
});
router.get('/querycustomer',(req,res,next)=>{
    let _id = req.param('id');
    customer.findOne({_id},(err,doc)=>{
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
router.post('/delete',(req,res,next)=>{
    let _id = req.body.id;
    customer.remove({_id},((err,doc)=>{
        if(err){
            return res.json({
                result:false
            })
        }
        return res.json({
            result:true,
            data:doc
        })
    }))

});

module.exports = router;