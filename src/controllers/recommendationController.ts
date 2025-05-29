import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Property from '../models/Property';

// Recommend a property to another user by email
export const recommendProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { recipientEmail, propertyId } = req.body;
    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      res.status(404).json({ message: 'Recipient not found' });
      return;
    }
    if (!recipient.recommendationsReceived.includes(propertyId)) {
      recipient.recommendationsReceived.push(propertyId);
      await recipient.save();
    }
    res.json({ message: 'Property recommended successfully' });
  } catch (err) {
    next(err);
  }
};

// Get all recommendations received
export const getRecommendations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById((req as any).user.userId).populate('recommendationsReceived');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user.recommendationsReceived);
  } catch (err) {
    next(err);
  }
};
