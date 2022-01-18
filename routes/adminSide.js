const express = require("express");
const router=express.Router();
const auth = require("../middlewares/auth");
const bcrypt = require("bcryptjs");
const {check,validationResult}=require('express-validator');
// const config = require("config");

const Employer = require("../models/Employer")
const Leave=require("../models/Leave");

router.post("/registerEmployee",[
    auth,
    check("email","Please include a valid email").isEmail(),
    check("password","Please enter a valid password").not().isEmpty(),
    check("mobile","Please enter a valid mobile").not().isEmpty(),
    check("employeeID","Please enter employeeID").not().isEmpty(),
    check("department","Please enter department").not().isEmpty()
],async (req,res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {name,email,mobile,department,employeeID,password} = req.body;
        var employee = await Employer.findOne({email:email});
        if(employee){
            return res.status(400).json({errors:[{"msg":"A user with given email already exist"}]});
        }
        employee= new Employer({
            name,
            email,
            password,
            mobile,
            department,
            employeeID
        })
        const salt= await bcrypt.genSalt(10);
     
        employee.password=await bcrypt.hash(password,salt);
        console.log(employee);
        await employee.save();
    
    res.json({success:[{"msg":"Employee registration successful"}]});
    }catch(err){
        console.log(err);
        res.status(400).json({errors:[{"msg":"Server error"}]});
    }
});

router.get("/getLeaveRequest",auth,async (req,res) => {
    var skip=req.query.skip;
    try{
    var leave=await Leave.find({status:"Pending"}).populate("userId","name").skip(0).limit(10).sort({date:1}).exec();
        // console.log(leave);
        res.json(leave);
    // console.log(leave);
    
    }catch(err){
        console.log(err.msg);
        res.status(400).json({errors:[{"msg":"Something went wrong"}]});
    }

})

router.get("/getLeaveDetail/:leave_id",auth,async (req,res) => {
    console.log("leaveisddd",req.params.leave_id);
    try{
    var leave=await Leave.findOne({_id:req.params.leave_id}).populate("userId").exec();
        // console.log(leave);
        res.json(leave);
    // console.log(leave);
    
    }catch(err){
        console.log(err.msg);
        res.status(400).json({errors:[{"msg":"Something went wrong"}]});
    }

})

router.post("/submitLeaveStatus/:leave_id/:id",auth,async (req,res) => {
    try{
    console.log("adminremarks status",req.body);
    var leave=await Leave.findOne({_id:req.params.leave_id});
    var employee=await Employer.findOne({_id:req.params.id});
    console.log(leave);
    console.log(employee);
    if(leave.leaveType=='Sick leave'){
        console.log("sick leave");
        employee.sickLeaves=parseInt(employee.sickLeaves) - parseInt(leave.days);
    }
    else if(leave.leaveType=='Casual leave'){
        console.log("casual leave");
        employee.casualLeaves=parseInt(employee.casualLeaves) - parseInt(leave.days);
    }
    else{
        employee.restrictedHolidays=parseInt(employee.restrictedHolidays) - parseInt(leave.days);
    }
    leave.status=req.body.status;
    leave.adminRemarks=req.body.adminremarks;
    await leave.save();
    await employee.save();
    res.json({success:[{msg:"Action submitted"}]});
}catch(err){
        console.log(err.msg);
        res.status(400).json({errors:[{"msg":"Something went wrong"}]});
    }
});

router.get("/fetchLeaveHistory",async (req,res) => {
    try{
        var leave = await Leave.find({}).populate("userId","name").sort({date:-1}).limit(10).exec();
        res.json(leave);

    }catch(err){
        console.log(err);
        res.status(400).json({errors:[{"msg":"Something went wrong"}]});
    }
})

router.get("/fetchEmp",async (req,res) => {
    try{
        console.log(req.query.name);
        const regex = new RegExp(escapeRegex(req.query.name), 'gi');
       const employers=await Employer.find({name:regex}).select({"name":1});
       console.log(employers);
        res.json(employers);

    }catch(err){
        console.log(err);
        res.status(400).json({errors:[{"msg":"Something went wrong"}]});
    }
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;