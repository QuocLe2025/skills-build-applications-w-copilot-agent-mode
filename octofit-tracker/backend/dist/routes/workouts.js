import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => {
    res.json({
        workouts: [
            { id: 'w1', name: 'Full-body Strength', durationMinutes: 40, difficulty: 'intermediate' },
            { id: 'w2', name: 'HIIT Burn', durationMinutes: 30, difficulty: 'advanced' },
            { id: 'w3', name: 'Recovery Stretch', durationMinutes: 20, difficulty: 'beginner' },
        ],
    });
});
export default router;
