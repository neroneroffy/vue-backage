let express = require('express');
let router = express.Router();
let Manager = require('../models/manager');
router.get('/manager',(req,res,next)=>{
    let pageNum = parseInt(req.param('pageNum'));
    let pageSize = parseInt(req.param('pageSize'));
    let skip = (pageNum-1)*pageSize;

    let total = 0;
    Manager.find({}).skip(skip).limit(pageSize).exec((err,doc)=>{
        if(err){
            return res.json({
                result:false
            })
        }
        let result = doc;
        Manager.find({},(err,doc)=>{
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
router.get('/queryuser',(req,res,next)=>{
    let id = req.param('id');
    Manager.findOne({id},(err,doc)=>{
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
    Manager.remove({id},((err,doc)=>{
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
router.post('/updatestatus',(req,res,next)=>{
    let id = req.body.id;
    let update = {
        $set:{
            status:req.body.status?false:true
        }
    }

    Manager.findOneAndUpdate({id},update,(err,doc)=>{
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