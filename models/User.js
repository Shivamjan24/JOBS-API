const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")
require("dotenv").config()
const userschema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide some value for the name field"],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,"please provide some value for the email field"],    
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please provide a valid email",
        ],
    },
    password:{
        type:String,
        required:[true,"please provide some value for password field"],
        minlength:6
    }
})

userschema.pre("save",async function(){
    const salt=await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userschema.methods.createjwt= function(){
    return jwt.sign({userid:this._id,name:this.name},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}

userschema.methods.checkpassword=async function(password){
    const iscorrect=await bcrypt.compare(password,this.password)
    return iscorrect;
}

module.exports=mongoose.model("schema",userschema)