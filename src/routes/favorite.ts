import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favoriteController';

const router = Router();

router.post('/', authMiddleware, addFavorite);
router.delete('/', authMiddleware, removeFavorite);
router.get('/', authMiddleware, getFavorites);

export default router;
