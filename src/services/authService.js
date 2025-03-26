const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserDTO = require('../dto/userDTO.js');

class AuthService {
    async register({ username, email, password }) {
        const user = await User.create({ username, email, password });
        return new UserDTO(user);
    }

    async login({ email, password }) {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return { token, user: new UserDTO(user) };
    }
}

module.exports = new AuthService();