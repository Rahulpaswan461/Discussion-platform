require("dotenv").config()

const express = require("express")
const userRoute = require("./routes/user")
const {connectMongoDB} = require("./connection")
const cookieParser = require("cookie-parser")
const {checkForAuthenticatedUser} = require("./middleware/authentication")
const discussionRoute = require("./routes/discussion")
const bodyParser = require("body-parser")

const app = express()
const PORT  = process.env.PORT || 8000

connectMongoDB(process.env.MONGO_URL)
.then(()=>console.log("MongoDB is connected !!"))
.catch((error)=>console.log("There is some error while connecting",error))

app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));

app.get("/",(req,res)=>{
    return res.send("From the server side")
})

app.use(cookieParser())
app.use(checkForAuthenticatedUser("token"))

app.use("/api/user",userRoute)
app.use("/api/discussion",discussionRoute)

app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`)
})