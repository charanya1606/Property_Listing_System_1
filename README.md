
# Property Listing System

A full-stack property listing system built with Node.js, Express, TypeScript, MongoDB (Mongoose), and Redis caching. This application allows users to create, view, filter, update, and delete property listings, with advanced filtering and caching for performance.

## Features

- User authentication and authorization
- Create, read, update, and delete property listings
- Advanced filtering (price, area, bedrooms, bathrooms, rating, location, property type, amenities, etc.)
- Pagination support
- Redis caching for property list endpoints
- CSV data import utility
- RESTful API structure

## Project Structure

```
Property_Listing_System/
├── data.csv                  # Sample property data (CSV)
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── src/
    ├── index.ts              # Application entry point
    ├── config/
    │   ├── db.ts             # MongoDB connection
    │   └── redis.ts          # Redis client setup
    ├── controllers/
    │   ├── authController.ts
    │   ├── favoriteController.ts
    │   ├── propertyController.ts
    │   └── recommendationController.ts
    ├── middlewares/
    │   └── authMiddleware.ts
    ├── models/
    │   ├── Property.ts       # Property Mongoose model
    │   └── User.ts           # User Mongoose model
    ├── routes/
    │   ├── auth.ts
    │   ├── favorite.ts
    │   ├── property.ts
    │   └── recommendation.ts
    ├── scripts/
    │   └── importData.ts     # CSV import script
    └── utils/
        └── importCSV.ts      # CSV parsing utility
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)
- Redis instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Property_Listing_System
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file in the root directory with the following variables:
     ```env
     MONGODB_URI=mongodb://localhost:27017/property-listing
     REDIS_URL=redis://localhost:6379
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. **Import sample data (optional):**
   ```sh
   npm run import:data
   ```

5. **Start the application:**
   ```sh
   npm run dev
   ```
   The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Properties
- `GET /api/properties` — List properties (supports filtering, pagination)
- `POST /api/properties` — Create a new property (auth required)
- `GET /api/properties/:id` — Get property details
- `PUT /api/properties/:id` — Update property (auth & ownership required)
- `DELETE /api/properties/:id` — Delete property (auth & ownership required)

#### Filtering Example
```
GET /api/properties?minPrice=100000&maxPrice=500000&propertyType=Apartment&bedrooms=3
```

### Favorites
- `POST /api/favorites/:propertyId` — Add property to favorites
- `DELETE /api/favorites/:propertyId` — Remove property from favorites
- `GET /api/favorites` — List favorite properties

### Recommendations
- `GET /api/recommendations` — Get recommended properties

## Property Model Fields
- `title`, `description`, `price`, `location`, `bedrooms`, `bathrooms`, `area`, `propertyType`, `images`, `createdBy`, `amenities`, `furnishing`, `listingDate`, `sellerType`, `tags`, `color`, `rating`, `featured`, `listingType`

## Scripts
- `npm run dev` — Start server in development mode
- `npm run build` — Build TypeScript
- `npm run start` — Start server in production mode
- `npm run import:data` — Import properties from `data.csv`

## Notes
- Ensure MongoDB and Redis are running before starting the server.
- JWT authentication is required for creating, updating, and deleting properties.
- Caching is enabled for property listing endpoint for performance.

## License
MIT

