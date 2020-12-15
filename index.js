var express = require('express');
var app = express();
var mongoose = require('mongoose');
var postRoutes = require('./routes/posts');
require('dotenv/config')

app.use(express.json())
app.use('/posts', postRoutes)

mongoose.connect(
    process.env.DB_CONNECTION, 
    // { useNewUrlParser: true },
    { useUnifiedTopology: true },
    ()=>{
    console.log('connected to DB')
})

app.listen(8000, ()=>{
    console.log('listening on PORT 8000');
})