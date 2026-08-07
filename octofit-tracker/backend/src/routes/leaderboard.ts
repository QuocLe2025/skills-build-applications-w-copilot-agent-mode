import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .sort({ rank: 1 })
      .populate('user', 'username')
      .lean();

    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load leaderboard' });
  }
});

export default router;
