const express = require("express");
const router=express.Router();
const auth = require("../middlewares/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {check,validationResult}=require('express-validator');
// const config = require("config");

const Employer = require("../models/Employer")

router.get("/",auth,async (req,res) => {
    try{
        const user= await Employer.findById(req.user.id).select('-password');
        // console.log(user);
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/adminLogin",[
    check('email',"Please include a valid email").isEmail(),
    check("password","Please enter a valid password").exists()
],async (req,res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    

const {email,password} = req.body;

try{

   var  user = await Employer.findOne({email:email,role:1});
    
    if(!user){
        return res.status(400).json({errors:[{"msg":"Invalid credentials"}]});
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({errors:[{"msg":"Invalid credentials"}]});
    }

    

const payload={
    user:{
        id:user.id
    }
}

jwt.sign(
    payload,
    process.env.JWT,
    {expiresIn:360000},
    (err,token) => {
        if(err) throw err;
        res.json({token})
    }
)

}
catch(err){
console.log(err.message);
res.status(500).send('Server error')
}

}
)



router.post("/employeeLogin",[
    check('email',"Please include a valid email").isEmail(),
    check("password","Please enter a valid password").exists()
],async (req,res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    

const {email,password} = req.body;

try{

   var  user = await Employer.findOne({email:email,role:0});
    
    if(!user){
        return res.status(400).json({errors:[{"msg":"Invalid credentials"}]});
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({errors:[{"msg":"Invalid credentials"}]});
    }

    

const payload={
    user:{
        id:user.id
    }
}

jwt.sign(
    payload,
    process.env.JWT,
    {expiresIn:360000},
    (err,token) => {
        if(err) throw err;
        res.json({token})
    }
)

}
catch(err){
console.log(err.message);
res.status(500).send('Server error')
}

}
)


module.exports=router;