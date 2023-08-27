import { Document, Schema, model } from "mongoose";
import { ITravelReview } from "./interfaces/review.entity.interface";

type ReviewDocument = Document & ITravelReview;

const ReviewSchema = new Schema<ITravelReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    travel: { type: Schema.Types.ObjectId, ref: "Travel" },
    comment: String,
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 0"],
      max: [5, "Rating must not exceed 5"],
      validate: {
        validator: (value: number) => value >= 1 && value <= 5,
        message: "Rating must be between 1 and 5",
      },
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Review = model<ITravelReview>("Review", ReviewSchema);

export { Review, ITravelReview, ReviewDocument };
