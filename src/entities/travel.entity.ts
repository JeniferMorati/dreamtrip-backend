import { Document, Schema, model } from "mongoose";
import { ITravelDestination } from "./interfaces/travel.entity.interface";

type TravelDestinationDocument = Document & ITravelDestination;

const TravelDestinationSchema = new Schema<ITravelDestination>(
  {
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String, required: [true, "Description is required"] },
    location: {
      city: { type: String, required: [true, "City is required"] },
      country: { type: String, required: [true, "Country is required"] },
      state: String,
      address: String,
      zipCode: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    image: String,
    imageVersion: String,
    category: [{ icon: String, label: String }],
    included: [{ icon: String, label: String }],
    rating: {
      type: Number,
      required: false,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must not exceed 5"],
      validate: {
        validator: (value: number) => value >= 0 && value <= 5,
        message: "Rating must be between 0 and 5",
      },
    },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        comment: String,
        rating: Number,
        date: Date,
      },
    ],
    price: { type: Number, required: [true, "Price is required"] },
    availableDates: [{ startDate: Date, endDate: Date }],
    notes: [{ title: String, content: String, date: Date }],
    accommodation: [
      { icon: String, label: String, description: String, active: Boolean },
    ],
    itinerary: [{ activity: String, date: Date, time: String, notes: String }],
    gallery: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const TravelDestination = model<ITravelDestination>(
  "TravelDestination",
  TravelDestinationSchema,
);

export { TravelDestination, ITravelDestination, TravelDestinationDocument };
