import { IEntity } from "@entities/base.entity";
import { Types } from "mongoose";

export interface IFavorite extends IEntity {
  user: Types.ObjectId;
  travel: Types.ObjectId;
  createdAt: Date;
}
