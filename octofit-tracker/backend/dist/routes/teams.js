import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => {
    res.json({
        teams: [
            { id: 't1', name: 'Morning Marathoners', members: 14 },
            { id: 't2', name: 'Sunset Sprinters', members: 9 },
            { id: 't3', name: 'Core Crushers', members: 12 },
        ],
    });
});
export default router;
