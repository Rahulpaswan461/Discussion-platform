const mongoose = require("mongoose")

const discussionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    image: { type: String },
    hashtags: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        replies: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String, required: true },
            likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
        }]
    }],
    createdOn:{
        type:Date,
        default:new Date()
    },
    postViews:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]

}, { timestamps: true });

const Discussion = mongoose.model("discussion",discussionSchema)

module.exports = Discussion