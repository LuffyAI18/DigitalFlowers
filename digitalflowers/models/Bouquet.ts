import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBouquet extends Document {
  slug: string;
  flowerType: string;
  flowerColor: string;
  bouquetStyle: string;
  wrappingStyle: string;
  ribbonStyle: string;
  decorations: string[];
  size: string;
  arrangementPosition: string;
  petalDensity: string;
  message: string;
  createdAt: Date;
  expiresAt: Date;
  shareCount: number;
  published: boolean;
  shareUrl: string;
}

const BouquetSchema = new Schema<IBouquet>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    flowerType: {
      type: String,
      required: true,
      default: "rose",
    },
    flowerColor: {
      type: String,
      required: true,
      default: "classic-red",
    },
    bouquetStyle: {
      type: String,
      required: true,
      default: "small-hand-tied",
    },
    wrappingStyle: {
      type: String,
      required: true,
      default: "kraft-paper",
    },
    ribbonStyle: {
      type: String,
      required: true,
      default: "gold-ribbon",
    },
    decorations: {
      type: [String],
      default: [],
    },
    size: {
      type: String,
      required: true,
      default: "medium",
    },
    arrangementPosition: {
      type: String,
      required: true,
      default: "centered",
    },
    petalDensity: {
      type: String,
      required: true,
      default: "medium",
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 }, // MongoDB TTL index
    },
    shareCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
    shareUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

// Compound index for cleanup queries
BouquetSchema.index({ expiresAt: 1 });
BouquetSchema.index({ slug: 1, published: 1 });

const Bouquet: Model<IBouquet> =
  mongoose.models.Bouquet || mongoose.model<IBouquet>("Bouquet", BouquetSchema);

export default Bouquet;
