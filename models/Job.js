const mongoose=require("mongoose")
const jobschema=new mongoose.Schema({
    company:{
        type:String,
        required:[true,"please provide some value for the company field"],
        trim:true,
        maxlength:50
    },
    position:{
        type:String,
        required:[true,"please provide some value for tje position field"],
        maxlength:100,
        trim:true
    },
    status:{
        type:String,
        enum:["pending","declined","interview"],
        default:"pending"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"schema",
        required:[true,"please provide some value for user"]
    }
},{timestamps:true})

module.exports=mongoose.model("jobschema",jobschema);