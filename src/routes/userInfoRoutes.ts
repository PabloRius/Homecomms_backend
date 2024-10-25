import express from 'express';
import { body, param } from 'express-validator';
import {
  createUserInfo,
  getUserInfoById,
} from '../controllers/userInfoController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: User Info
 *  description: Ops related to User Info
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Create a new User Info instance
 *      tags: [User Info]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/IdInput'
 *      responses:
 *          201:
 *              description: Successfully created a new User Info
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserInfo'
 *          400:
 *              description: Bad request - Invalid input data
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorResponse'
 *          500:
 *              description: Server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  '/',
  [
    body('id')
      .notEmpty()
      .withMessage('Id is required')
      .isString()
      .withMessage('Id must be a string'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isString()
      .withMessage('Email must be a string'),
  ],
  createUserInfo
);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      summary: Get User Info by ID
 *      tags: [User Info]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: The user unique ID
 *      responses:
 *          200:
 *              description: User Info found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserInfo'
 *          400:
 *              description: Bad request - Invalid ID format
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorResponse'
 *          404:
 *              description: User Info not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorResponse'
 *          500:
 *              description: Server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  '/:id',
  [
    param('id')
      .notEmpty()
      .withMessage('ID parameter is required')
      .isMongoId()
      .withMessage('ID parameter must be a MongoDB _id'),
  ],
  getUserInfoById
);

export default router;
