import { Request, Response, NextFunction } from 'express';
import Property from '../models/Property';
import client from '../config/redis';

// Create Property
export const createProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = new Property({ ...req.body, createdBy: (req as any).user.userId });
    await property.save();
    await client.del('properties_cache'); // Invalidate cache
    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
};

// Get All Properties with Filtering, Pagination, and Caching
export const getProperties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cache = await client.get('properties_cache');
    if (cache) {
      res.json(JSON.parse(cache));
      return;
    }
    const {
      minPrice, maxPrice, minArea, maxArea, minBedrooms, maxBedrooms, minBathrooms, maxBathrooms, minRating, maxRating,
      location, propertyType, furnishing, sellerType, listingType, featured, color, amenities, tags, listingDateFrom, listingDateTo
    } = req.query;
    const query: any = {};
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
    if (minArea || maxArea) query.area = {};
    if (minArea) query.area.$gte = Number(minArea);
    if (maxArea) query.area.$lte = Number(maxArea);
    if (minBedrooms || maxBedrooms) query.bedrooms = {};
    if (minBedrooms) query.bedrooms.$gte = Number(minBedrooms);
    if (maxBedrooms) query.bedrooms.$lte = Number(maxBedrooms);
    if (minBathrooms || maxBathrooms) query.bathrooms = {};
    if (minBathrooms) query.bathrooms.$gte = Number(minBathrooms);
    if (maxBathrooms) query.bathrooms.$lte = Number(maxBathrooms);
    if (minRating || maxRating) query.rating = {};
    if (minRating) query.rating.$gte = Number(minRating);
    if (maxRating) query.rating.$lte = Number(maxRating);
    if (location) query.location = location;
    if (propertyType) {
      if (Array.isArray(propertyType)) {
        query.propertyType = { $in: propertyType };
      } else if (typeof propertyType === 'string' && propertyType.includes(',')) {
        query.propertyType = { $in: propertyType.split(',') };
      } else {
        query.propertyType = propertyType;
      }
    }
    if (furnishing) query.furnishing = furnishing;
    if (sellerType) query.sellerType = sellerType;
    if (listingType) query.listingType = listingType;
    if (featured !== undefined) query.featured = featured === 'true';
    if (color) query.color = color;
    if (amenities) query.amenities = { $all: (Array.isArray(amenities) ? amenities : [amenities]) };
    if (tags) query.tags = { $all: (Array.isArray(tags) ? tags : [tags]) };
    if (listingDateFrom || listingDateTo) {
      query.listingDate = {};
      if (listingDateFrom) query.listingDate.$gte = new Date(listingDateFrom as string);
      if (listingDateTo) query.listingDate.$lte = new Date(listingDateTo as string);
    }
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const properties = await Property.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    await client.set('properties_cache', JSON.stringify(properties), { EX: 60 });
    res.json(properties);
  } catch (err) {
    next(err);
  }
};

// Get Single Property
export const getProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ message: 'Not found' });
    }
    res.json(property);
  } catch (err) {
    next(err);
  }
};

// Update Property
export const updateProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    // property is not null here
    if ((property as any).createdBy.toString() !== (req as any).user.userId) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    Object.assign(property as object, req.body);
    await property.save();
    await client.del('properties_cache');
    res.json(property);
  } catch (err) {
    next(err);
  }
};

// Delete Property
export const deleteProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    // property is not null here
    if ((property as any).createdBy.toString() !== (req as any).user.userId) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    await property.deleteOne();
    await client.del('properties_cache');
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
