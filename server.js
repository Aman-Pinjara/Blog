const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')

mongoose.connect('mongodb+srv://Aman:amanajmal@cluster0.m4ak2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log("connected"))
.catch((err) => console.log(err));


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/', async (req,res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(3000)