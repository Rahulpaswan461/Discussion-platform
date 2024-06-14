const express = require("express")
const upload = require("../middleware/upload")
const {createDiscussion,updateDiscussion,deleteDiscussion,
    getDiscussionByHashTags,getDiscussionByText,commentOnDiscussion,
    likeDiscussion,likeComment,getAllPostViwes,replyToComment,likeReply} = require("../controllers/discussion")

const router = express.Router()

router.post("/create",upload.single("image"),createDiscussion)
router.patch("/update/:discussionId",updateDiscussion)
router.delete("/delete/:discussionId",deleteDiscussion)
router.get("/tags/:tags",getDiscussionByHashTags)
router.get("/text/:text",getDiscussionByText)
router.post("/comment/:discussionId",commentOnDiscussion)
router.post("/likes/:discussionId",likeDiscussion)
router.post("/like-comment/:discussionId/:commentId",likeComment)
router.get("/postviews/:discussionId",getAllPostViwes)
router.post("/reply/:discussionId/:commentId",replyToComment)
router.post("/like-reply/:discussionId/:commentId/:replyId",likeReply)

module.exports = router