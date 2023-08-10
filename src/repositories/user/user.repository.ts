import { IUser, User, UserDocument } from "@entities/user.entity";
import { LogLevel, log } from "@expressots/core";
import { BaseRepository } from "@repositories/base-repository";
import { provide } from "inversify-binding-decorators";
import { PopulateOptions } from "mongoose";

@provide(UserRepository)
export class UserRepository extends BaseRepository<IUser, UserDocument> {
  constructor() {
    super();
    this.model = User;
  }

  async findByEmail(
    email: string,
    embeddedRelations: string[] | PopulateOptions | PopulateOptions[] = [],
  ): Promise<IUser | null> {
    try {
      const res = await this.model
        .findOne({
          email: email,
        })
        .populate(embeddedRelations)
        .then((userDocument) => {
          return userDocument;
        });
      return Promise.resolve(res);
    } catch (error: any) {
      log(LogLevel.Error, error, "baserepository-findbyid");
      return Promise.reject(null);
    }
  }

  async findByEmailWithPassword(
    email: string,
    embeddedRelations: string[] | PopulateOptions | PopulateOptions[] = [],
  ): Promise<IUser | null> {
    try {
      const res = await this.model
        .findOne({
          email: email,
        })
        .select("+password")
        .populate(embeddedRelations)
        .then((userDocument) => {
          return userDocument;
        });
      return Promise.resolve(res);
    } catch (error: any) {
      log(LogLevel.Error, error, "baserepository-findbyid");
      return Promise.reject(null);
    }
  }
}
