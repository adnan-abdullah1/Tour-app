import { Document, Schema } from 'mongoose';

export interface Package extends Document {
  name: string;
  title: string;
  location: string;
  description: string;
  rating: number;
  duration: string;
  startDate: Date;
  endDate: Date;
  startDay: string;
  endDay: string;
  price: number;
  callNumber: string;
  email: string;
  redirectionUrl: string;
  inclusions: string[];
  exclusions: string[];
  highlights: {
    title: string;
    content: string[];
  };
  tourItinerary: {
    title: string;
    content: string[];
  };
  policy: {
    title: string;
    content: string[];
  };
  imageUrls: string[];
  daysPlan: Array<{
    day: number;
    plan: string;
    description: string;
  }>;
  status: 'active' | 'inactive' | 'archived';
}

export const PackageSchema = new Schema<Package>({
  title: { type: String, required: false },
  location: { type: String, required: false },
  description: { type: String, require: false },
  rating: { type: Number, require: false },
  duration: { type: String, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  redirectionUrl: { type: String, required: false, unique: true },
  startDay: { type: String, required: false },
  endDay: { type: String, required: false },
  price: { type: Number, required: true },
  callNumber: { type: String, required: false },
  email: { type: String, required: false },
  inclusions: { type: [String], required: false },
  exclusions: { type: [String], required: false },
  highlights: {
    title: { type: String, required: false },
    content: { type: [String], required: false },
  },
  tourItinerary: {
    title: { type: String, required: false },
    content: { type: [String], required: false },
  },
  policy: {
    title: { type: String, required: false },
    content: { type: [String], required: false },
  },
  imageUrls: { type: [String], required: false },
  daysPlan: {
    day: { type: Number, required: false },
    plan: { type: String, required: false },
    description: { type: String, required: false },
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],
    default: 'inactive',
  },
});
