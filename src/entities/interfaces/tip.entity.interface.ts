import { IEntity } from "@entities/base.entity";

export interface ITip extends IEntity {
  content: string;
  coverPhoto: string;
  createdAt: Date;
  subTitle: string;
  title: string;
  updatedAt?: Date;
  upVotes?: number;
}
