const { BadRequestError } = require("../errors");
const jobschema=require("../models/Job")
const {StatusCodes}=require("http-status-codes")

const createjob=async (req,res)=>{
    req.body.createdBy=req.user.userid;
    const user=await jobschema.create(req.body)
    res.status(201).json(user);
}

const getalljobs=async (req,res)=>{
    const jobs=await jobschema.find({createdBy:req.user.userid})
    res.status(StatusCodes.OK).json(jobs)
}

const getjob=async (req,res)=>{
    const {id:jobid}=req.params;
    const {userid}=req.user;
    const job=await jobschema.findOne({createdBy:userid,_id:jobid})
    if(!job)
        throw new BadRequestError(`no job with jobid of ${jobid} created by userid of ${userid}`)
    res.status(StatusCodes.OK).json(job)
}

const updatejob=async (req,res)=>{
    const {id:jobid}=req.params;
    const {userid}=req.user;
    if(req.body.company==="" || req.body.position==="")
        throw new BadRequestError("please provide updated value for both company and position")
    const job=await jobschema.findByIdAndUpdate({createdBy:userid,_id:jobid},req.body,{new:true,runValidators:true})
    if(!job)
        throw new BadRequestError(`no job with jobid of ${jobid} created by userid of ${userid}`)
    res.status(StatusCodes.OK).json(job)
}

const deletejob=async (req,res)=>{
    const {id:jobid}=req.params;
    const {userid}=req.user;
    const job=await jobschema.findByIdAndRemove({createdBy:userid,_id:jobid})
    if(!job)
        throw new BadRequestError(`no job with jobid of ${jobid} created by userid of ${userid}`)
    res.status(StatusCodes.OK).send()
}

module.exports={createjob,getalljobs,getjob,updatejob,deletejob}