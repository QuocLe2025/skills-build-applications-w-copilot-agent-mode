import { Router } from 'express';
import Workout from '../models/workout.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().populate('recommendedFor', 'username email').lean();
    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load workouts' });
  }
});

export default router;
