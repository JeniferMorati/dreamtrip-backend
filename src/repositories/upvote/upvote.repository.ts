import { IUpvote, Upvote, UpvoteDocument } from "@entities/upvote.entity";
import { LogLevel, Report, StatusCode, log } from "@expressots/core";
import { BaseRepository } from "@repositories/base-repository";
import { provide } from "inversify-binding-decorators";
import { Types } from "mongoose";

@provide(UpvoteRepository)
export class UpvoteRepository extends BaseRepository<IUpvote, UpvoteDocument> {
  constructor() {
    super();
    this.model = Upvote;
  }

  async userUpvoteCheck({
    userId,
    tipId,
  }: {
    userId: Types.ObjectId;
    tipId: Types.ObjectId;
  }): Promise<{
    id: string;
    status: boolean;
  }> {
    try {
      const upvote = await Upvote.findOne({ user: userId, tip: tipId });

      if (!upvote) {
        Report.Error(
          "Error in upvote check",
          StatusCode.InternalServerError,
          "upvote-repository",
        );

        return {
          id: "",
          status: !!upvote,
        };
      }

      return {
        id: upvote.id,
        status: !!upvote,
      };
    } catch (error: any) {
      log(LogLevel.Error, error, "upvote-repository-userUpvoteCheck");

      return {
        id: "",
        status: false,
      };
    }
  }

  async getCounterOfUpvotes(tipId: string): Promise<number> {
    try {
      const upvoteCount = await Upvote.countDocuments({ tip: tipId });
      return upvoteCount;
    } catch (error: any) {
      log(LogLevel.Error, error, "upvote-repository-getCounterOfUpvotes");
      return 0;
    }
  }
}
