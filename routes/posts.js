var express = require('express');
var routes = express.Router();
var PostModel = require('../models/PostModel');


routes.get('/', async (req, res) => {
    try{
        const allPosts = await PostModel.find();
        res.json(allPosts)
    }catch(err){
        res.status(404).send(err.message)
    }
})

routes.post('/', async (req, res) => {
    const post = new PostModel({
        title: req.body.title,
        description: req.body.description,
    });

    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.status(404).send(err.message)
    }

    // post.save().then((data)=>{
    //     res.send(data)
    // }).catch(err => {
    //     res.status(404).send(err)
    // })
})

routes.get('/:id', async (req, res) => {
    try{
        const specificPosts = await PostModel.findById(req.params.id);
        res.json(specificPosts)
    }catch(err){
        res.status(404).send(err.message)
    }
})

routes.delete('/:id', async (req, res) => {
    try{
        const deletedPost = await PostModel.remove({_id:req.params.id});
        res.json(deletedPost)
    }catch(err){
        res.status(404).send(err.message)
    }
})

routes.patch('/:id', async (req, res) => {
    try{
        const post = await PostModel.updateOne(
            {_id:req.params.id},
            {$set: {
                title:req.body.title,
                description:req.body.description
            }}
            );
        res.json(post)
    }catch(err){
        res.status(404).send(err.message)
    }
})

module.exports = routes;