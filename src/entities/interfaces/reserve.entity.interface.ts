import { IEntity } from "@entities/base.entity";
import { Types } from "mongoose";

export interface IReserve extends IEntity {
  user: Types.ObjectId;
  travel: Types.ObjectId;
  startDate: Date;
  endDate: Date;
}
