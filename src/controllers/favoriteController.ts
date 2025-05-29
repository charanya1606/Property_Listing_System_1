import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Property from '../models/Property';

// Add to favorites
export const addFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById((req as any).user.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if (!user.favorites.includes(req.body.propertyId)) {
      user.favorites.push(req.body.propertyId);
      await user.save();
    }
    res.json({ message: 'Added to favorites' });
  } catch (err) {
    next(err);
  }
};

// Remove from favorites
export const removeFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById((req as any).user.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    user.favorites = user.favorites.filter(
      (id) => id.toString() !== req.body.propertyId
    );
    await user.save();
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    next(err);
  }
};

// Get all favorites
export const getFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById((req as any).user.userId).populate('favorites');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user.favorites);
  } catch (err) {
    next(err);
  }
};
