require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const router1=require("./routes/auth")
const router2=require("./routes/jobs")
const auth=require("./middleware/authentication")
const xss=require("xss-clean")
const cors=require("cors")
const helmet=require("helmet")
const ratelimiter=require("express-rate-limit")

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB=require("./db/connect")

app.use(express.json());
app.use(cors)
app.use(helmet)
app.use(xss)
app.use(ratelimiter({
  windowMs: 15 * 60 * 1000, 
  max:100
}))
// extra packages

// routes
app.get("/",(req,res)=>{
  res.send("JOBS API")
})

app.use("/api/v1/auth",router1)
app.use("/api/v1/jobs",auth,router2)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
