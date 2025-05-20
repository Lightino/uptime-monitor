import express from 'express';
import endpoints from './endpoints.js';

const router = express.Router();

router.use('/endpoints', endpoints);

export default router;
