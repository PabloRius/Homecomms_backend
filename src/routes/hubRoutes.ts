import express from 'express';
import { body, param } from 'express-validator';
import {
  createHub,
  deleteHubById,
  getHubById,
} from '../controllers/hubController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Hubs
 *  description: Ops related to Hubs
 */

/**
 * @swagger
 * /api/hubs:
 *  post:
 *      summary: Create a new Hub
 *      tags: [Hubs]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/HubInput'
 *      responses:
 *          201:
 *              description: Successfully created a new Hub
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/HubInfo'
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
    body('name')
      .notEmpty()
      .withMessage('name is required')
      .isString()
      .withMessage('name must be a string'),
    body('description')
      .optional()
      .isString()
      .withMessage('description must be a string'),
    body('createdBy')
      .notEmpty()
      .withMessage('createdBy parameter is required')
      .isMongoId()
      .withMessage('createdBy parameter must be a MongoDB _id'),
  ],
  createHub
);

/**
 * @swagger
 * /api/hubs/{id}:
 *  get:
 *      summary: Get Hub by ID
 *      tags: [Hubs]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: The hub unique ID
 *      responses:
 *          200:
 *              description: Hub Info found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/HubInfo'
 *          400:
 *              description: Bad request - Invalid ID format
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorResponse'
 *          404:
 *              description: Hub Info not found
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
  getHubById
);

/**
 * @swagger
 * /api/hubs/{id}:
 *  delete:
 *      summary: Delete Hub by ID
 *      tags: [Hubs]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: The hub unique ID
 *      responses:
 *          200:
 *              description: Hub deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/HubInfo'
 *          400:
 *              description: Bad request - Invalid ID format
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ErrorResponse'
 *          404:
 *              description: Hub not found
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
router.delete(
  '/:id',
  [
    param('id')
      .notEmpty()
      .withMessage('ID parameter is required')
      .isMongoId()
      .withMessage('ID parameter must be a MongoDB _id'),
  ],
  deleteHubById
);

export default router;
