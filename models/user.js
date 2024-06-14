const mongoose = require("mongoose")
const {createHmac,randomBytes} = require("node:crypto");
const { createTokenForAuthenticateUser } = require("../services/authentication");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    }],
    followings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    salt:{
        type:String,
    }
},{timestamps:true})


userSchema.pre("save",function(next){
    const user = this;
    
    const salt = randomBytes(16).toString()
    const hasedPassword = createHmac("sha256",salt)
    .update(user.password)
    .digest("hex")

    user.password = hasedPassword
    user.salt = salt;

    next();

})

userSchema.static("matchPasswordAndGenerateToken",async function(email,password){
    const user = await this.findOne({email})
    if(!user) throw new Error("User is not valid!!")
    
    const salt = user.salt;
    const userPassword = user.password;

    const newHashedPassword = createHmac("sha256",salt)
    .update(password)
    .digest("hex")

    if(userPassword !== newHashedPassword)
        throw new Error("User is not valid !!!!")

    const token = createTokenForAuthenticateUser(user)

    return token;
})

const User = mongoose.model("user",userSchema)

module.exports = User