const {BadRequestError, UnauthenticatedError} = require("../errors");
const schema=require("../models/User")
const {StatusCodes}=require("http-status-codes")
const bcrypt = require('bcryptjs');

const register = async (req,res)=>{
    const user=await schema.create({...req.body});
    const token=user.createjwt()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
        throw new BadRequestError("please provide both email and password")
    const user=await schema.findOne({email})
    if(!user)
        throw new UnauthenticatedError("Invalid email, please provide correct email")
    const iscorrect=await user.checkpassword(password)
    if(!iscorrect)
        throw new UnauthenticatedError("Invalid password, please provide correct password")
    const token=user.createjwt()
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token})
}

module.exports={register,login}