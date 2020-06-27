import { check } from 'express-validator';

export const validateSignUp = [
    check('email', 'Please enter a username').not().isEmpty(),
    check('token', 'Please enter a token').not().isEmpty()
];

export const validateLogin = [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({ min: 6 })
];
