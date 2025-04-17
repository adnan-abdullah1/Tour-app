import { Document, Schema } from 'mongoose';

export const PackageSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, default: '', maxlength: 255, nullable: true },
    description: { type: String, nullable: true },
    redirectUrl: { type: String, default: '', nullable: true },
    rating: { type: Number, default: 0, nullable: true },
    price: { type: Schema.Types.Decimal128, default: 0 },
    inclusions: { type: String, nullable: true },
    exclusions: { type: String, nullable: true },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    daysPlan: [
      {
        day: { type: Number, required: true },
        plan: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    media: [
      {
        url: { type: String, required: true },
        path: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'inactive',
    },
    startDate: { type: Date, nullable: true },
    endDate: { type: Date, nullable: true },
    highlights: [
      {
        icon: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

export interface Package extends Document {
  _id: string;
  name: string;
  location: string;
  description: string;
  redirectUrl: string;
  rating: number;
  price: number;
  inclusions: string;
  exclusions: string;
  createdAt: Date;
  deletedAt: Date;
  daysPlan: Array<{ day: number; plan: string; description: string }>;
  media: Array<{ url: string; path: string }>;
  status: 'active' | 'inactive' | 'archived';
  startDate: Date;
  endDate: Date;
  highlights: Array<{ icon: string; description: string }>;
}
