const { Schema, model } = require('mongoose')
const Post = require('Post')
const User = require('User')

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectID,
        ref: User,
        required: true
    },
    name: {
        type: String,
        trim: true,
        maxlength: 30,
        required: true
    },
    title: {
        type: String,
        trim: true,
        maxlength: 100
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500
    },
    profilePic: String,
    links: {
        website: String,
        facebook: String,
        twitter: String,
        github: String,
    },
    posts: [
        {
            type: Schema.Types.ObjectID,
            ref: Post
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectID,
            ref: Post
        }
    ],
}, {
    timestamps: true
})

const Profile = model('Profile', profileSchema)
module.exports = Profile