import { IEntity } from "@entities/base.entity";
import { Types } from "mongoose";

export interface IVacationPackage extends IEntity {
  travels: Types.ObjectId[];
}
