let express = require('express');
let router = express.Router();
let Warehouse = require('../models/warehouse');
router.get('/getList',(req,res,next)=>{
    let pageNum = parseInt(req.param('pageNum'));
    let pageSize = parseInt(req.param('pageSize'));
    let skip = (pageNum-1)*pageSize;

    let total = 0;
    Warehouse.find({}).skip(skip).limit(pageSize).exec((err,doc)=>{
        if(err){
            return res.json({
                result:false
            })
        }
        let result = doc;
        Warehouse.find({},(err,doc)=>{
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
    Warehouse.findOne({id},(err,doc)=>{
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
    Warehouse.remove({id},((err,doc)=>{
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

    Warehouse.findOneAndUpdate({id},update,(err,doc)=>{
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