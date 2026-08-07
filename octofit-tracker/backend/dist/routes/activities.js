import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => {
    res.json({
        activities: [
            { id: 'a1', type: 'Running', distanceKm: 8.2, durationMinutes: 54 },
            { id: 'a2', type: 'Cycling', distanceKm: 18.5, durationMinutes: 65 },
            { id: 'a3', type: 'Yoga', durationMinutes: 45, intensity: 'moderate' },
        ],
    });
});
export default router;
