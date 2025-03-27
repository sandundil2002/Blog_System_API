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

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
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

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

sequelize.sync()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = { app, server, io };