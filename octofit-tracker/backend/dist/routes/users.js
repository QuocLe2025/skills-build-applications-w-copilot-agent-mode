import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => {
    res.json({
        users: [
            { id: 'u1', username: 'fituser', email: 'fituser@example.com' },
            { id: 'u2', username: 'runner42', email: 'runner42@example.com' },
            { id: 'u3', username: 'coachjane', email: 'coachjane@example.com' },
        ],
    });
});
export default router;
