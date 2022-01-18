const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    department:{
        type:String
    },
    employeeID:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
    casualLeaves:{
        type:Number,
        default:40
    },
    sickLeaves:{
        type:Number,
        default:15
    },
    restrictedHolidays:{
        type:Number,
        default:2
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Employer",employerSchema);