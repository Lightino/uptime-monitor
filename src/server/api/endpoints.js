import express, { response } from 'express';
import { knex } from '../db/index.js';

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
router.get('/', (req, res) => {
  knex('endpoints')
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
 *               website:
 *                 type: integer
 *               api:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Endpoint added
 *       400:
 *         description: Missing data
 *       409:
 *         description: Endpoint already on db
 */
router.post('/add', (req, res) => {
  const { name, url, status = false, incidents = 0, responseTime = 0, website = 0, api = 0 } = req.body;

  if (!name || !url) {
    return res.status(400).json({ error: 'Missing datas' });
  }

  knex('endpoints')
    .where({ name, url })
    .first()
    .then((existing) => {
      if (existing) {
        return res.status(409).json({ error: 'Data already exists' });
      }

      return knex('endpoints')
        .insert({ name, url, status, incidents, responseTime, website, api })
        .returning('*')
        .then((newData) => {
          res.status(201).json({ data: newData });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

export default router;
