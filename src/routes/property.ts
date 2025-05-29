import { Router, RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty
} from '../controllers/propertyController';

const router = Router();

/**
 * @route GET /properties
 * @desc Get all properties with advanced filtering
 * @query
 *   - minPrice, maxPrice: number
 *   - minArea, maxArea: number
 *   - minBedrooms, maxBedrooms: number
 *   - minBathrooms, maxBathrooms: number
 *   - minRating, maxRating: number
 *   - location: string
 *   - propertyType: string
 *   - furnishing: string
 *   - sellerType: string
 *   - listingType: string (sale/rent)
 *   - featured: boolean
 *   - color: string
 *   - amenities: string[] (all must match)
 *   - tags: string[] (all must match)
 *   - listingDateFrom, listingDateTo: date range
 *   - page, limit: pagination
 */

// Use controller functions directly, do not wrap in arrow functions
router.post('/', authMiddleware, asyncHandler((req, res, next) => createProperty(req, res, next)));
router.get('/', asyncHandler((req, res, next) => getProperties(req, res, next)));
router.get('/:id', asyncHandler((req, res, next) => getProperty(req, res, next)));
router.put('/:id', authMiddleware, asyncHandler((req, res, next) => updateProperty(req, res, next)));
router.delete('/:id', authMiddleware, asyncHandler((req, res, next) => deleteProperty(req, res, next)));

// Minimal test route for type isolation
// router.get('/test-type', asyncHandler((req, res, next) => {
//   res.json({ ok: true });
// }));

export default router;
