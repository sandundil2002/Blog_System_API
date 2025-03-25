const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    async register({ username, email, password }) {
        const user = await User.create({ username, email, password });
        return { id: user.id, username: user.username, email: user.email };
    }

    async login({ email, password }) {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '15m',
        });
        return { token, user: { id: user.id, username: user.username, email: user.email } };
    }
}

module.exports = new AuthService();