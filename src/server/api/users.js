import express from 'express';
import { knex } from '../db/index.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing a single Auth0 user
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user info
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 created_at:
 *                   type: string
 */
router.get('/me', authorize(), async (req, res) => {
  const user_id = req.user?.sub;

  if (!user_id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Trova o crea l'utente
    let user = await knex('users').where({ id: user_id }).first();

    if (!user) {
      const [newUser] = await knex('users')
        .insert({
          id: user_id,
          created_at: new Date()
        })
        .returning('*');

      user = newUser;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /users/me:
 *   delete:
 *     summary: Delete current user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete('/me', authorize(), async (req, res) => {
  const user_id = req.user?.sub;

  if (!user_id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await knex('users').where({ id: user_id }).del();
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Manually add a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Missing fields
 *       409:
 *         description: User already exists
 */
router.post('/add', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  try {
    const existing = await knex('users').where({ id }).first();

    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const [newUser] = await knex('users')
      .insert({
        id,
        created_at: new Date()
      })
      .returning('*');

    res.status(201).json({ user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
