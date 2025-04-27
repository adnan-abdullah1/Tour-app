import { Document, model, Schema } from 'mongoose';

// Define an interface for the Affiliate document
export interface Affiliate extends Document {
  name: string; // Name of the affiliate (e.g., Amazon, eBay)
  apiKey: string; // API key for the affiliate
  apiSecret?: string; // Optional API secret
  baseUrl: string; // Base URL for the affiliate API
  isActive: boolean; // Whether the affiliate is active
  createdAt: Date; // Timestamp for when the affiliate was created
  updatedAt: Date; // Timestamp for when the affiliate was last updated
  environment: string; // Environment (e.g., production, staging, development)
}

// Define the Mongoose schema
export const AffiliateSchema = new Schema<Affiliate>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
    apiSecret: {
      type: String,
      required: false,
    },
    baseUrl: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    environment: {
      type: String,
      enum: ['production', 'staging', 'development'],
      default: 'development',
    },
  },
  {
    timestamps: true,
  },
);

export const AffiliateModel = model<Affiliate>('Affiliate', AffiliateSchema);
