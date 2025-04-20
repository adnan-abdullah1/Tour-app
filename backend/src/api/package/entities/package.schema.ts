import { Document, Schema } from 'mongoose';

export interface Package extends Document {
  title: string;
  duration: string;
  startDate: string;
  endDate: string;
  startDay: string;
  endDay: string;
  price: string;
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
}

export const PackageSchema = new Schema<Package>({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  redirectionUrl: { type: String, required: true },
  startDay: { type: String, required: true },
  endDay: { type: String, required: true },
  price: { type: String, required: true },
  callNumber: { type: String, required: true },
  email: { type: String, required: true },
  inclusions: { type: [String], required: true },
  exclusions: { type: [String], required: true },
  highlights: {
    title: { type: String, required: true },
    content: { type: [String], required: true },
  },
  tourItinerary: {
    title: { type: String, required: true },
    content: { type: [String], required: true },
  },
  policy: {
    title: { type: String, required: true },
    content: { type: [String], required: true },
  },
  imageUrls: { type: [String], required: true },
});
