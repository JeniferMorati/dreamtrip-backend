import { IEntity } from "@entities/base.entity";
import { Types } from "mongoose";

export interface IUpvote extends IEntity {
  user: Types.ObjectId;
  tip: Types.ObjectId;
  createdAt: Date;
}
