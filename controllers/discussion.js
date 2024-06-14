const Discussion = require("../models/discussion")

// create new discussion
async function createDiscussion(req,res){
    try{
       const { text,hashtags } = req.body;
       const discussion = new Discussion({user:req.user._id,text,hashtags});

       if(req.file){
        discussion.image = req.file.path
       }
       await discussion.save()

       return res.status(201).json({msg:"Discussion created successfully !!!"})
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error",error})
    }
}

// update the discussion 
async function updateDiscussion(req,res){
    try{
        const updatedDiscussion = await Discussion.findByIdAndUpdate(req.params.discussionId,req.body,{new:true})
        return res.status(200).json(updatedDiscussion)
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error",error})
    }
}
// delete discussion 
async function deleteDiscussion(req,res){
    try{
       await Discussion.findByIdAndDelete(req.params.discussionId)

       return res.status(200).json({msg:"Discussion deleted successfully !!"})
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error",error})
    }
}


// search discussion by tags
async function getDiscussionByHashTags(req,res){
    try{
        const discussion = await Discussion.find({ hashtags: { $in: req.params.tags.split(',') } });

        if (!discussion || discussion.length === 0) {
            return res.status(400).json({ msg: "No discussions found matching the provided tags." });
        }
        discussion[0].postViews.push(req.user._id);
        
        return res.status(200).json(discussion)
    }  
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error !!"})
    }
}
// search discussion by text
async function getDiscussionByText(req,res){
    try{
        const discussion = await Discussion.find({ text: { $regex: req.params.text, $options: 'i' } });
        if (!discussion || discussion.length === 0) {
            return res.status(400).json({ msg: "No discussions found matching the provided text." });
        }
    //   discussion.postViews.push(req.user._id);
    discussion[0].postViews.push(req.user._id);

      return res.status(200).json(discussion)
    }  
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({Msg:"Internal Servre Error !!"})
    }
}

// comment on discussion
async function commentOnDiscussion(req,res){
    try{
       const discussion = await Discussion.findById(req.params.discussionId)

       if(!discussion){
         return res.status(404).json({msg:"Discussion is not present !!"})
       }
       discussion.comments.push({ user: req.user._id, text: req.body.text });
       discussion.postViews.push(req.user._id);

       await discussion.save();

       return res.status(200).json({msg:"Comment uploaded successfully !!"})
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({Msg:"Internal Server Error !!!"})
    }
    
}
// like the discussion
async function likeDiscussion(req,res){
    try{
       const discussion = await Discussion.findById(req.params.discussionId)

       if(!discussion){
        return res.status(400).json({msg:"Discussion is not present !!"})
       }
       if(discussion.likes.includes(req.user._id)){
        return res.status(400).json({msg:"Already liked"})
       }

       discussion.likes.push(req.user._id)
       await discussion.save()

       return res.status(200).json({msg:"likes added successfully !!"})
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({Msg:"Internal Server Error !!!"})
    }
}

//like the comment
async function likeComment(req,res){
    try{
      const discussion = await Discussion.findById(req.params.discussionId)
      const comment = discussion.comments.id(req.params.commentId)

      if(comment.likes.includes(req.user._id)){
         return res.status(40).josn({msg:"Already liked !!"})
      }
      comment.likes.push(req.user._id)

      await comment.save()

      return res.status(200).json({msg:"like added successfully !!"})

    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal server Error !!!"})
    }
}
// get the total number of views on particular post
async function getAllPostViwes(req,res){
    try{
         const discussion = await Discussion.findById(req.params.discussionId)
         if(!discussion){
            return res.status(400).json({msg:"No discussion present !!"})
         }
        return res.status(200).json({msg:"Total views : "+discussion.postViews.length})
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error",error})
    }
}

// reply to the comment
async function replyToComment(req,res){
    try{
        const discussion = await Discussion.findById(req.params.discussionId)
        const comment = discussion.comments.id(req.params.commentId)
        comment.replies.push({user:req.user._id,text:req.body.text})

        // await comment.save()
        await discussion.save()
        return res.status(200).json({msg:"Reply added successfully !!"})
    }
    catch(error){
        console.log("There is somer error",error)
        return res.status(500).json({mg:"Internal Server Errror",error})
    }
}

// like the reply
async function likeReply(req,res){
    try{
       const discussion = await Discussion.findById(req.params.discussionId)
        const comment = discussion.comments.id(req.params.commentId)

        const reply = comment.replies.id(req.params.replyId)

        if(reply.likes.includes(req.user._id)){
            return res.status(400).json({msg:"You have already liked the reply !!"})
        }
        reply.likes.push(req.user._id)

        await discussion.save()

        return res.status(200).json(discussion)
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error",error})
    }
}

module.exports = {
    createDiscussion,
    updateDiscussion,
    deleteDiscussion,
    getDiscussionByHashTags,
    getDiscussionByText,
    commentOnDiscussion,
    likeDiscussion,
    likeComment,
    getAllPostViwes,
    replyToComment,
    likeReply
}