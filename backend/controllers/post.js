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

exports.getMyPosts = (req, res, next) => {
    Post.find({ userId: req.auth.userId }).sort(({ date: 'descending' }))
        .then(posts => res.status(200).json(posts))
        .catch(() => res.status(400).json({ error: "User no found or unindentified" }));
}

exports.createPost = (req, res, next) => {
    const postObject = req.body
    delete postObject._id;
    const post = new Post ({
        ...postObject,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "",
        likes: 0,
        usersLiked: [' ']
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post saved !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
    {
        ...(req.body.post),
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

exports.likePost = (req, res, next) => {
    switch (req.body.like) {
        case 1 :
            Post.updateOne({ _id: req.params.id },
            { $inc: { likes: +1 }, $push: { usersLiked: req.auth.userId }})
                .then(() => res.status(200).json({ message: "I like" }))
                .catch(error => res.status(400).json({ error }));
            break;

        case 0 : 
            Post.findOne({ _id: req.params.id })
                .then((post) => {
                    if (post.usersLiked.includes(req.auth.userId)) {
                        Post.updateOne({ _id: req.params.id }, 
                        { $inc: { likes: -1 }, $pull: { usersLiked: req.auth.userId }})
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
