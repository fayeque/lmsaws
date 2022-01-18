const express = require("express");
const router=express.Router();
const auth = require("../middlewares/auth");
const {check,validationResult}=require('express-validator')

const Leave = require("../models/Leave");

router.get("/getLeave",auth,async (req,res) => {
    var skip=req.query.skip;
    try{
    var leave=await Leave.find({userId:req.user.id}).populate("userId","casualLeaves medicalLeaves restrictedHolidays").skip(0).limit(10).sort({date:-1}).exec();
        console.log(leave);
        res.json(leave);
    // console.log(leave);
    
    }catch(err){
        console.log(err.msg);
        res.status(400).json({errors:[{"msg":"Something went wrong"}]});
    }

})

router.post("/leaveRequest",[
    auth,
    check("from","From date is required").not().isEmpty(),
    check("to","To date is required").not().isEmpty(),
    check("leaveType","Leave type is required").not().isEmpty()
],async (req,res) => {
    console.log(req.body,typeof(req.body.from));

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {from,to,leaveType,remarks,days} = req.body;
        var leave= new Leave({
            from,
            to,
            leaveType,
            remarks,
            days,
            userId:req.user.id
        })
        console.log(leave);
        await leave.save();
    
    res.json({success:[{"msg":"Leave request sent successfully"}]});
    }catch(err){
        console.log(err);
        res.status(400).json({errors:[{"msg":"Server error"}]});
    }
})

module.exports = router;