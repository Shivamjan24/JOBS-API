const { UnauthenticatedError } = require("../errors");
const jwt=require("jsonwebtoken")
require("dotenv").config()
const schema=require("../models/User")

const auth = (req,res,next)=>{
    const token=req.headers.authorization;
    if(!token || !token.startsWith("Bearer "))
        throw new UnauthenticatedError("not allowed to access these resources")
    const toke=token.split(" ")[1]
    try
    {
        const {userid,name}=jwt.verify(toke,process.env.JWT_SECRET)
        const user=schema.findOne({_id:userid})
        if(!user)
            throw new UnauthenticatedError("not allowed to access these resources")
        req.user={userid,name};
        next()
    }
    catch(error)
    {
        res.status(400).json({error})
    }
}

module.exports=auth;