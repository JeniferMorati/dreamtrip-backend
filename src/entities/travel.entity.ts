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
        message: "Rating must be between 1 and 5",
      },
      default: 0,
    },
    price: { type: Number, required: [true, "Price is required"] },
    dateRange: {
      openDate: {
        type: Date,
        required: true,
        default: Date.now(),
      },
      closeDate: {
        type: Date,
        required: true,
      },
    },
    notes: [{ title: String, content: String, date: Date }],
    accommodation: [
      { icon: String, label: String, description: String, active: Boolean },
    ],
    itinerary: [{ activity: String, date: Date, time: String, notes: String }],
    gallery: [String],
    vacanciesPerPeriod: {
      type: Number,
      required: [true, "Vacancies per period is required"],
      default: 1,
    },
    vacationPackageId: {
      type: Schema.Types.ObjectId,
      ref: "Package",
    },
    capacityPeople: {
      type: Number,
      required: [true, "Capacity of people is required"],
      default: 1,
    },
    additionalPerPerson: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const TravelDestination = model<ITravelDestination>(
  "Travel",
  TravelDestinationSchema,
);

export { TravelDestination, ITravelDestination, TravelDestinationDocument };
