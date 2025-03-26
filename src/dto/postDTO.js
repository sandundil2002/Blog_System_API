class PostDTO {
    constructor(post) {
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.userId = post.userId;
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
    }
}

module.exports = PostDTO;