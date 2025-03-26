const postService = require('../services/postService');

const createPost = async (req, res, next) => {
    try {
        const post = await postService.createPost({ ...req.body, userId: req.user.id });
        req.io.emit('postCreated', post);
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await postService.getPosts();
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

const getPostById = async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Blog post not found' });
        res.json(post);
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const post = await postService.updatePost(req.params.id, req.body, req.user.id);
        req.io.emit('postUpdated', post);
        res.json(post);
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        await postService.deletePost(req.params.id, req.user.id);
        req.io.emit('postDeleted', { id: req.params.id });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };