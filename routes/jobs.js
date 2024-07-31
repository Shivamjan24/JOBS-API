const express=require("express")
const { createjob, getalljobs, getjob, updatejob, deletejob } = require("../controllers/jobs");
const router=express.Router()

router.route("/").post(createjob).get(getalljobs)
router.route("/:id").get(getjob).patch(updatejob).delete(deletejob)

module.exports=router;