const Post = require('../models/Post');
const sequelize = require('../config/database');
const PostDTO = require('../dto/postDto');

class PostService {
    async createPost({ title, content, userId }) {
        const transaction = await sequelize.transaction();
        try {
            const post = await Post.create({ title, content, userId }, { transaction });
            await transaction.commit();
            return new PostDTO(post);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async getPosts() {
        const posts = await Post.findAll();
        return posts.map(post => new PostDTO(post));
    }

    async getPostById(id) {
        const post = await Post.findByPk(id);
        return post ? new PostDTO(post) : null;
    }

    async updatePost(id, { title, content }, userId) {
        const post = await Post.findByPk(id);
        if (!post || post.userId !== userId) throw new Error('Unauthorized or post not found');
        const updatedPost = await post.update({ title, content });
        return new PostDTO(updatedPost);
    }

    async deletePost(id, userId) {
        const post = await Post.findByPk(id);
        if (!post || post.userId !== userId) throw new Error('Unauthorized or post not found');
        return post.destroy();
    }
}

module.exports = new PostService();