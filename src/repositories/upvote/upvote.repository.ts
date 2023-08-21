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

  createUpvoteInstance(user_id: string, tip_id: string): IUpvote {
    const userObjectId = new Types.ObjectId(user_id);
    const tipObjectId = new Types.ObjectId(tip_id);

    const upvote = new Upvote({
      tip: tipObjectId,
      user: userObjectId,
    });

    return upvote;
  }

  async userUpvoteCheck({
    userId,
    tipId,
  }: {
    userId: string;
    tipId: string;
  }): Promise<{
    id: string;
    status: boolean;
  }> {
    try {
      const userObjectId = new Types.ObjectId(userId);
      const tipObjectId = new Types.ObjectId(tipId);
      const upvote = await Upvote.findOne({
        user: userObjectId,
        tip: tipObjectId,
      });

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
