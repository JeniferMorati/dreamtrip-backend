import { Document, Schema, model } from "mongoose";
import { UserDocument } from "./user.entity";
import { IEntity } from "./base.entity";

interface IReview {
  user: UserDocument;
  comment: string;
  rating: number;
  date: Date;
}

interface ITravelDestination extends IEntity {
  name: string;
  description: string;
  location: string;
  image?: string;
  imageVersion?: string;
  rating: number;
  reviews: IReview[];
  price: number;
  availableDates: {
    startDate: Date;
    endDate: Date;
  }[];
}

type TravelDestinationDocument = Document & ITravelDestination;

const travelDestinationSchema = new Schema<ITravelDestination>(
  {
    name: {
      type: String,
      required: [true, "Destination name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    image: {
      type: String,
      required: false,
      select: true,
    },
    imageVersion: {
      type: String,
      required: false,
      select: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 0,
      max: 5,
    },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        rating: { type: Number, min: 0, max: 5 },
        date: { type: Date },
      },
    ],
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    availableDates: [
      {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const TravelDestination = model<ITravelDestination>(
  "TravelDestination",
  travelDestinationSchema,
);

export { TravelDestination, ITravelDestination, TravelDestinationDocument };
