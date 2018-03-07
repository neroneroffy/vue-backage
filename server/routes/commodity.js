let express = require('express');
let router = express.Router();
let Commodity = require('../models/commodity');
router.get('/getList',(req,res,next)=>{
    let pageNum = parseInt(req.param('pageNum'));
    let pageSize = parseInt(req.param('pageSize'));
    let skip = (pageNum-1)*pageSize;

    let total = 0;
    Commodity.find({}).skip(skip).limit(pageSize).exec((err,doc)=>{
        if(err){
            return res.json({
                result:false
            })
        }
        let result = doc;
        Commodity.find({},(err,doc)=>{
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
router.get('/querycommodity',(req,res,next)=>{
    let id = req.param('id');
    Commodity.findOne({id},(err,doc)=>{
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
    Commodity.remove({id},((err,doc)=>{
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