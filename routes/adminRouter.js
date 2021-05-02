const express = require('express')
const router = express.Router()
const multer = require('multer')
const AllBlogs = require('../models/allBlogsModel')
const path = require('path')
const uploadPath = path.join('public', AllBlogs.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})
router.get('/', (req, res) => {
    res.render('admin/adminIndex')
})
router.get('/blogs/new', (req, res) => {
    res.render('admin/createBlog')
})









//Get All Blogs
router.get('/blogs', async (req, res) => {
    const blogs = await AllBlogs.find()
    res.render('admin/adminAllBlogs', { blogs: blogs })
})

//Get One Blogs
router.get('/blogs/:id', async (req, res) => {
    const blog = await AllBlogs.findById(req.params.id)
    if (blog == null) res.redirect('/admin/adminAllBlogs')
    res.render('show', { blog: blog })
})


//Create Blogs
router.post('/blogs', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    let blogs = new AllBlogs({
        title: req.body.title, 
        description: req.body.description, 
        content: req.body.content,
        createdAt: req.body.createdAt,
        coverImageName: fileName    
    })
    try{
        blogs = await blogs.save()
        res.redirect('/admin/blogs')
        
    }catch(err){
        res.redirect('/admin/createBlog')
    }
})
//Edit Blog GET BY ID
router.get('/blogs/edit/:id', async (req, res) => {
    const blog = await AllBlogs.findById(req.params.id)
    res.render('admin/editBlog', { blog: blog })
})
//Edit Blog 
router.put('/blogs/edit/:id', async (req, res) => {
    req.blog = await AllBlogs.findById(req.params.id)
    let blog = req.blog
        blog.title = req.body.title
        blog.description = req.body.description
        try {
            blog = await blog.save()
            res.redirect('/admin/blogs')
        } catch {
            res.send('error')
        }
})

//Delete Blogs
router.delete('/blogs/:id', async (req, res) => {
    await AllBlogs.findByIdAndDelete(req.params.id)
    res.redirect('/admin/blogs')
})




module.exports = router