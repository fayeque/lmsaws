const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const leaveSchema = new mongoose.Schema({
    from:{
        type:Date,
        required:true
    },
    to:{
        type:Date,
        required:true
    },
    days:{
        type:Number,
        require:true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:"Employer"
    },
    leaveType:{
        type:String
    },
    remarks:{
        type:String
    },
    status:{
        type:String,
        default:"Pending"
    },
    adminRemarks:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Leave",leaveSchema);