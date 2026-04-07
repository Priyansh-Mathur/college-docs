const express=require('express')
const router=express.Router();
const Document=require('../models/Document')
const verifyToken = require('../middlewares/verifytoken');

router.get(`/mydocs`, verifyToken, async(req,res)=>{
    const {year,branch}=req.query;
    try{
    //    we now will create the filter
    const filter={}
    if(year)filter.year=Number(year);//year can be stored as string in db
    if(branch)filter.branch=branch;
    const docs=await Document.find(filter)
    res.status(200).json({ success: true, docs });



    }
    catch(e){
         console.error('Error fetching documents:', e);
        res.status(400).json({ success: false, message:"Server Error"});
    }
})

module.exports=router;