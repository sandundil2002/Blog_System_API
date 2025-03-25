const authService = require('../services/authService');
const { check } = require('express-validator');

const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { token, user } = await authService.login(req.body);
        res.cookie('token', token, { httpOnly: true }).json(user);
    } catch (error) {
        next(error);
    }
};

const validationRules = {
    register: [
        check('username').notEmpty(),
        check('email').isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    login: [check('email').isEmail(), check('password').notEmpty()],
};

module.exports = { register, login, validationRules };