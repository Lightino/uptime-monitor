import express from 'express';
import endpoints from './endpoints.js';
import users from './users.js';

const router = express.Router();

router.use('/endpoints', endpoints);
router.use('/users', users);

export default router;
