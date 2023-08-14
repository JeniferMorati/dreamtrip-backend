import { Document, Schema, model } from "mongoose";
import { ITip } from "./interfaces/tip.entity.interface";

type TipDocument = Document & ITip;

const TipSchema = new Schema<ITip>(
  {
    content: { type: String, required: true },
    coverPhoto: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    subTitle: { type: String, required: true },
    title: { type: String, required: true },
    updatedAt: { type: Date, required: true, default: Date.now },
    upVotes: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Tip = model<ITip>("Tip", TipSchema);

export { Tip, ITip, TipDocument };
