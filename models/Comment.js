const { Schema, model } = require('mongoose')

const commentSchema = Schema({
    post: {
        type: Schema.Types.ObjectID,
        ref: 'Post',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectID,
        required: true,
        ref: 'User'
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    replies: [
        {
            body: {
                type: String,
                required: true
            },
            user: {
                type: Schema.Types.ObjectID,
                required: true,
                ref: 'User'
            },
            createdAt: {
                type: Date,
                default: new Date()
            }
        }
    ]
}, {
    timestamps: true
})

const Comment = model('Comment', commentSchema)
module.exports = Comment