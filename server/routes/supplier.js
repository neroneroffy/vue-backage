let express = require('express');
let router = express.Router();
let Supplier = require('../models/supplier');
router.get('/getList',(req,res,next)=>{
    let pageNum = parseInt(req.param('pageNum'));
    let pageSize = parseInt(req.param('pageSize'));
    let skip = (pageNum-1)*pageSize;

    let total = 0;
    Supplier.find({}).skip(skip).limit(pageSize).exec((err,doc)=>{
        if(err){
            return res.json({
                result:false
            })
        }
        let result = doc;
        Supplier.find({},(err,doc)=>{
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
router.get('/query',(req,res,next)=>{
    let id = req.param('id');
    Supplier.findOne({id},(err,doc)=>{
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
    let id = req.body.id;
    Supplier.remove({id},((err,doc)=>{
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
router.post('/update',(req,res,next)=>{
    let id = req.body.id;
    let update = {
        $set:{
            status:req.body.status?false:true
        }
    }

    Supplier.findOneAndUpdate({id},update,(err,doc)=>{
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