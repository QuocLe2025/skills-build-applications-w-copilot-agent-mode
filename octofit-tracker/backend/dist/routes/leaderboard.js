import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => {
    res.json({
        leaderboard: [
            { rank: 1, username: 'fituser', points: 1620 },
            { rank: 2, username: 'runner42', points: 1490 },
            { rank: 3, username: 'coachjane', points: 1385 },
        ],
    });
});
export default router;
