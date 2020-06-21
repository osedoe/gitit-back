import { check } from 'express-validator';

export const validateUser = [
    check('email', 'Please enter a username')
        .not().isEmpty(),
    check('token', 'Please enter a token')
        .not().isEmpty()
];
