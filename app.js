const express = require('express')
const path = require('path')
const app = express()


app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('/public/images'));
//METHOD OVERRIDE IS USED TO MAKE IT SO A FORM BUTTON IS NOT LIMMITED TO GET/POST
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://user:user1234@cluster0.czjuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology:true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to db'))


const adminRouter = require('./routes/adminRouter')
app.use('/admin', adminRouter)
const pagesRouter = require('./routes/pagesRouter')
app.use('/', pagesRouter)





let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
}) 