import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { recommendProperty, getRecommendations } from '../controllers/recommendationController';

const router = Router();

router.post('/', authMiddleware, recommendProperty);
router.get('/', authMiddleware, getRecommendations);

export default router;
