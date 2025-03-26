const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const sequelize = require("./src/config/database.js");
const authController = require('./src/controllers/authController.js');
const postController = require('./src/controllers/postController.js');
const authMiddleware = require('./src/middleware/authMiddleware.js');
const errorHandler = require('./src/middleware/errorHandler.js');
const cookieParser = require('cookie-parser');
const { validationResult } = require('express-validator');

const app = express();
app.use(cookieParser());
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.json());
dotenv.config();

app.use((req, res, next) => {
    req.io = io;
    next();
});

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    };
};

app.post('/auth/register', validate(authController.validationRules.register), authController.register);
app.post('/auth/login', validate(authController.validationRules.login), authController.login);

app.get('/posts', postController.getAllPosts);
app.get('/posts/:id', postController.getPostById);
app.post('/posts', authMiddleware, postController.createPost);
app.put('/posts/:id', authMiddleware, postController.updatePost);
app.delete('/posts/:id', authMiddleware, postController.deletePost);

app.use(errorHandler);

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});