import express from 'express';
import { knex } from '../db/index.js';

import authorize from '../middleware/authorize.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Endpoints
 *   description: API for managing endpoints
 */

/**
 * @swagger
 * /endpoints:
 *   get:
 *     summary: Get all endpoints
 *     tags: [Endpoints]
 *     responses:
 *       200:
 *         description: endpoints list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   url:
 *                     type: string
 */
router.get('/', authorize(), (req, res) => {
  const user_id = req.user?.sub;

  if (!user_id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  knex('endpoints')
    .where({ user_id })
    .select('*')
    .then((ep) => {
      res.status(200).json(ep);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/**
 * @swagger
 * /endpoints/add:
 *   post:
 *     summary: Add new endpoint
 *     tags: [Endpoints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - url
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *               status:
 *                 type: boolean
 *               incidents:
 *                 type: integer
 *               responseTime:
 *                 type: integer
 *               responseTimeArray:
 *                 type: jsonb
 *               website:
 *                 type: integer
 *               api:
 *                 type: integer
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Endpoint added
 *       400:
 *         description: Missing data
 *       409:
 *         description: Endpoint already on db
 */
router.post('/add', authorize(), (req, res) => {
  const user_id = req.user?.sub;
  const {
    name,
    url,
    status = false,
    incidents = 0,
    prev_incidents = 0,
    prev_responseTime = 0,
    responseTime = 0,
    website = 0,
    api = 0,
    responseTimeArray = { data: [] },
    notes = ""
  } = req.body;

  if (!user_id || !name || !url) {
    return res.status(400).json({ error: 'Missing name or url or unauthorized' });
  }

  knex('endpoints')
    .where({ name, url, user_id })
    .first()
    .then((existing) => {
      if (existing) {
        return res.status(409).json({ error: 'Data already exists' });
      }

      return knex('endpoints')
        .insert({
          name,
          url,
          user_id,
          status,
          incidents,
          responseTime,
          website,
          api,
          prev_incidents,
          prev_responseTime,
          responseTimeArray,
          notes
        })
        .returning('*')
        .then((newData) => {
          res.status(201).json({ data: newData });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


/**
 * @swagger
 * /endpoints/{id}/note:
 *   patch:
 *     summary: Update notes for a specific endpoint
 *     tags: [Endpoints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Endpoint ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notes updated successfully
 *       404:
 *         description: Endpoint not found
 *       500:
 *         description: Server error
 */
router.patch('/:id/note', authorize(), (req, res) => {
  const user_id = req.user?.sub;
  const { id } = req.params;
  const { notes } = req.body;

  if (!user_id || typeof notes !== 'string') {
    return res.status(400).json({ error: 'Invalid request' });
  }

  knex('endpoints')
    .where({ id, user_id })
    .update({ notes })
    .then((updatedRows) => {
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Endpoint not found or unauthorized' });
      }
      res.status(200).json({ message: 'Notes updated successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


export default router;
