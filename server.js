const express = require('express');
const dotenv = require('dotenv');
const sequelize = require("./src/config/database.js");
const User = require('./src/models/User.js');
const Post = require('./src/models/Post.js');

const app = express();
app.use(express.json());
dotenv.config();

app.use((req, res, next) => {
    next();
});

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});