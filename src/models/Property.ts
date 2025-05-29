import mongoose, { Document, Schema } from 'mongoose';

export interface IProperty extends Document {
  // Add all relevant fields from the CSV dataset
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  images: string[];
  createdBy: mongoose.Types.ObjectId;
  amenities: string[];
  furnishing: string;
  listingDate: Date;
  sellerType: string;
  tags: string[];
  color: string;
  rating: number;
  featured: boolean;
  listingType: string; // sale or rent
  // Add other attributes as needed
}

const PropertySchema = new Schema<IProperty>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  propertyType: { type: String, required: true },
  images: [{ type: String }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amenities: [{ type: String }],
  furnishing: { type: String },
  listingDate: { type: Date },
  sellerType: { type: String },
  tags: [{ type: String }],
  color: { type: String },
  rating: { type: Number },
  featured: { type: Boolean },
  listingType: { type: String },
  // Add other attributes as needed
});

export default mongoose.model<IProperty>('Property', PropertySchema);
