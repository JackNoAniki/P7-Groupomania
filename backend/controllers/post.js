const Post = require('../models/post');


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
        .catch(error => res.status(400).json({ error }))
};