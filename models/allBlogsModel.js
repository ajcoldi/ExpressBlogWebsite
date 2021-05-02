const mongoose = require('mongoose')
const path = require('path')
const coverImageBasePath = 'uploads/blogCovers'

const allBlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    coverImageName: {
        type: String,
        requried: true
    }
})

allBlogSchema.virtual('coverImagePath').get(function() {
    if(this.coverImageName != null) {
        return path.join('/', coverImageBasePath, this.coverImageName)
    }
})

module.exports = mongoose.model('AllBlogs', allBlogSchema)
module.exports.coverImageBasePath = coverImageBasePath