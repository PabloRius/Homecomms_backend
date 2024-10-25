import express from 'express';
// import { body, param } from 'express-validator';
import { body } from 'express-validator';
import { signIn, signUp } from '../controllers/authController';

const router = express.Router();

router.post(
  '/register',
  [
    body('username')
      .notEmpty()
      .withMessage('username is required')
      .isString()
      .withMessage('username must be a string'),
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isString()
      .withMessage('email must be a string'),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isString()
      .withMessage('password must be a string'),
  ],
  signUp
);

router.post(
  '/login',
  [
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isString()
      .withMessage('email must be a string'),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isString()
      .withMessage('password must be a string'),
  ],
  signIn
);

export default router;
