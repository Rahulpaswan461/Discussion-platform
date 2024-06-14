const express = require("express")
const {registerUser,loginUser,updateUserInformationById,
deleteUserInformationById,getListOfAllUsers,
searchUserByName,followUser,unfollowUser} = require("../controllers/user")

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.patch("/update/:id",updateUserInformationById)
router.delete("/delete/:id",deleteUserInformationById)
router.get("/getusers",getListOfAllUsers)
router.get("/search/:name",searchUserByName)
router.post("/follow/:id",followUser)
router.post("/unfollow/:id",unfollowUser)

module.exports = router