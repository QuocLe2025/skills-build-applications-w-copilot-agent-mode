import { Router } from 'express';
import Team from '../models/team.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find()
      .populate('coach', 'username email')
      .populate('members', 'username email')
      .lean();

    res.json({ teams });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load teams' });
  }
});

export default router;
