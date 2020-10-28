const { Schema, model } = require('mongoose')
const Comment = require('Comment')
const User = require('User')

const postSchema = Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectID,
        required: true,
        ref: User
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    readTime: String,
    likes: [
        {
            type: Schema.Types.ObjectID,
            ref: User
        }
    ],
    dislikes: [
        {
            type: Schema.Types.ObjectID,
            ref: User
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectID,
            ref: Comment
        }
    ]
}, {
    timestamps: true
})

const Post = model('Post', postSchema)
module.exports = Post