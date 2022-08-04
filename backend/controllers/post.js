const Post = require('../models/post');
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => { 
            res.status(400).json({ error }) 
        });
};

exports.createPost = (req, res) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post ({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        usersLiked: [' ']
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post saved !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res) => {
    const postObject = req.file ?
    {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Post modified !' }))
        .catch(error => res.status(400).json({ error })); 
};

exports.deletePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Post deleted !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.likePost = (req, res) => {
    switch (req.body.like) {
        case 1 :
            Post.updateOne({ _id: req.params.id },
            { $inc: { likes: +1 }, $push: { usersLiked: req.body.userId }})
                .then(() => res.status(200).json({ message: "I like" }))
                .catch(error => res.status(400).json({ error }));
            break;

        case 0 : 
            Post.findOne({ _id: req.params.id })
                .then((post) => {
                    if (post.usersLiked.includes(req.body.userId)) {
                        Post.updateOne({ _id: req.params.id }, 
                        { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }})
                            .then(() => res.status(200).json({ message: "Neutral" }))
                            .catch(error => res.status(400).json({ error }));
                    };
                })
                .catch(error => res.status(404).json({ error }));
            break;

        default:
            res.status(404).end();
    };
};
