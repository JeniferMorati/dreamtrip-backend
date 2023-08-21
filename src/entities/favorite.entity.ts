import { Document, Schema, model } from "mongoose";
import { IFavorite } from "./interfaces/favorite.intity.interface";

type FavoriteDocument = Document & IFavorite;

const FavoriteScheme = new Schema<IFavorite>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    travel: { type: Schema.Types.ObjectId, ref: "Travel", required: true },
    createdAt: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Favorite = model<IFavorite>("Favorite", FavoriteScheme);

export { Favorite, IFavorite, FavoriteDocument };
