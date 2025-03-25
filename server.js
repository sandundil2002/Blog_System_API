const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const sequelize = require("./src/config/database.js");
const authController = require('./src/controllers/authController.js');
const { validationResult } = require('express-validator');

const app = express();
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

// Auth Routes
app.post('/auth/register', validate(authController.validationRules.register), authController.register);
app.post('/auth/login', validate(authController.validationRules.login), authController.login);

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});