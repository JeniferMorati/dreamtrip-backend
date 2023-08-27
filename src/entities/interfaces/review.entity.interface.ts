import { IEntity } from "@entities/base.entity";
import { Types } from "mongoose";

export interface ITravelReview extends IEntity {
  travel: Types.ObjectId;
  user: Types.ObjectId;
  comment: string;
  rating: number;
}
