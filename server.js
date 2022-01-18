var express=require("express");
var app=express();
var mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
var PORT=process.env.PORT || 5000;

const userRoutes = require("./routes/User");

mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex',true);

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.get("/",(req,res) => {
    res.send("App");
})


app.use("/api",userRoutes);
app.use("/api",require("./routes/auth"));
app.use("/api",require("./routes/adminSide"));
app.use("/api",require("./routes/employeeSide"));
// app.use("/api/posts",require("./routes/leave"));
// app.use("/api/profile",require("./routes/api/profile"));



const start = async () => {
    try{
    await mongoose.connect('mongodb://Fayeque:Fayeque123@cluster0-shard-00-00.71j4f.mongodb.net:27017,cluster0-shard-00-01.71j4f.mongodb.net:27017,cluster0-shard-00-02.71j4f.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority');
    console.log("Connected to mongodb");
    app.listen(PORT,(req,res) =>{
        console.log("server started at 5000");
    })
}catch(err){
        console.log(err);

    }
}


start();
