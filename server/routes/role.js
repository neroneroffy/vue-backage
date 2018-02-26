let express = require('express');
let router = express.Router();
let role = require('../models/role');
let auth = require('../models/auth');
router.get('/list',(req,res,next)=>{
    role.find({},(err,doc)=>{
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
router.get('/info',(req,res,next)=>{
    let id = req.param("id");
    role.findOne({roleId:id},(err,doc)=>{
        if(err){
            return res.json({
                result:false
            })
        }

        auth.findOne({pid:id},(err,authInfo)=>{
            if(err){
                return res.json({
                    result:false
                })
            }

            return res.json({
                result:true,
                data:{
                    roleInfo:doc,
                    authInfo:authInfo.data,
                    alreadyAuth:authInfo.alreadyAuth
                }
            })
        })
    })
});
module.exports = router;