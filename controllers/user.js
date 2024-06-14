const User = require("../models/user")

// register the user
async function registerUser(req,res){
    try{
        const userData = req.body;
        if(!userData){
             return res.status(400).json({msg:"Information Incomplete !!"})
        }
        const newUserData = new User(userData);
        await newUserData.save();

        return res.status(201).json(newUserData)
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Sever Error",error})
    }
}

// login the user
async function loginUser(req,res){
    try{
         const {email,password }  = req.body;

         if(!email || !password){
            return res.status(400).json({msg:"Information Incomplete !!"})
         }
         const token = await User.matchPasswordAndGenerateToken(email,password)
          return res.cookie("token",token).json({msg:"User login successfully !!"})
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error",error})
    }
}

// update the user information
async function updateUserInformationById(req,res){
    try{
         if(!req.body || !req.params.id)
            return res.status(400).json({msg:"Information Incomplete !!"})
    
         const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})

         return res.status(200).json({msg:"Information updated successfully !!!"})
    } 
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error",error})
    }
}

async function deleteUserInformationById(req,res){
    try{
        if(!req.params.id)
            return res.status(400).json({msg:"Information Incomplete !!"})

        await User.findByIdAndDelete(req.params.id);
       return res.status(200).json({ message: 'User deleted' });
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error",error})
    }
}

// get list of all the users
async function getListOfAllUsers(req,res){
    try{
       const userData = await User.find({})
       if(!userData){
        return res.status(400).json({msg:"No information present !!!"})
       }
       return res.status(200).json(userData)

    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error",error})  
    }
}

// search the user by name 

async function searchUserByName(req,res){
    try{
        const user  = await User.findOne({name:req.params.name})
        if(!user){
            return res.status(404).json({msg:"No user present !!"})
        }
        return res.status(200).json(user)
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error",error})   
    }
}

// Follow user
async function followUser(req,res){
    try{
       const user = await User.findById(req.user._id)
       const targetUser = await User.findById(req.params.id)

       if(!targetUser){
        return res.status(404).json({ error: 'User not found' });
       }

       if(user.followings.includes(req.params.id)){
         return res.status(400).json({error:"User Already exists !!"})
       }

        user.followings.push(req.params.id)
        targetUser.followers.push(req.user._id)

        await user.save();
        await targetUser.save()

        return res.status(200).json({msg:"Successfully follow the user"})

    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error",error})    
    }
}

// unfollow the user
async function unfollowUser(req,res){
    try{
       const user = await User.findById(req.user._id)
       const targetUser = await User.findById(req.params.id)
       console.log("The request user id ",req.user._id)
       if (!targetUser) return res.status(404).json({ error: 'User not found' });
       
       if(!user.followings.includes(req.params.id)){
        return res.status(400).json({msg:"User not followed !!",targetUser})
       }

       user.followings = user.followings.filter(id =>id.toString() !==req.params.id)
       targetUser.followers = targetUser.followers.filter(id =>id.toString() !== req.user._id)

       await user.save();
       await targetUser.save();

       return res.status(200).json({msg:"Successfully unfollow the user"})

    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error",error}) 
    }
}
module.exports = {
    registerUser,
    loginUser,
    updateUserInformationById,
    deleteUserInformationById,
    getListOfAllUsers,
    searchUserByName,
    followUser,
    unfollowUser
}