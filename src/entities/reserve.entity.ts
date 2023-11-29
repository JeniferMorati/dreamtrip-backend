import { Document, Schema, model } from "mongoose";
import { IReserve } from "./interfaces/reserve.entity.interface";

type ReserveDocument = Document & IReserve;

const ReserveScheme = new Schema<IReserve>(
  {
    userEmail: { type: String, required: [true, "User email is required"] },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    travel: { type: Schema.Types.ObjectId, ref: "Travel", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Reserve = model<IReserve>("Reserve", ReserveScheme);

export { Reserve, IReserve, ReserveDocument };
