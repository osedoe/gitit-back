import { check } from 'express-validator';

export const validateSignUp = [
  check('email', 'Please enter a username').not().isEmpty(),
  check('password', 'Please enter a valid password').not().isEmpty().isLength({ min: 6 }),
  check('githubToken', 'Please enter a valid GitHub token').not().isEmpty()
];

export const validateLogin = [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Please enter a valid password').isLength({ min: 6 })
];
