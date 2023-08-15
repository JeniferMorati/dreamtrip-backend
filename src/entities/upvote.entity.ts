import { Document, Schema, model } from "mongoose";
import { IUpvote } from "./interfaces/upvote.entity.interface";

type UpvoteDocument = Document & IUpvote;

const UpvoteSchema = new Schema<IUpvote>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tip: { type: Schema.Types.ObjectId, ref: "Tip", required: true },
    createdAt: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Upvote = model<IUpvote>("Upvote", UpvoteSchema);

export { Upvote, IUpvote, UpvoteDocument };
