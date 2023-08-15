import { UpvoteRepository } from "@repositories/upvote/upvote.repository";
import { provide } from "inversify-binding-decorators";
import {
  IUpvoteSendRequestDTO,
  IUpvoteSendResponseDTO,
} from "./upvote-send.dto";
import { Report, StatusCode } from "@expressots/core";
import { Upvote } from "@entities/upvote.entity";

@provide(UpvoteSendUseCase)
class UpvoteSendUseCase {
  constructor(private upvoteRepository: UpvoteRepository) {}

  async execute(
    data: IUpvoteSendRequestDTO,
  ): Promise<IUpvoteSendResponseDTO | null> {
    const upVoteCheck = await this.upvoteRepository.userUpvoteCheck({
      tipId: data.tip,
      userId: data.user,
    });

    if (!upVoteCheck) {
      Report.Error(
        "Error on load upvote",
        StatusCode.InternalServerError,
        "upvote-send-usecase",
      );
    }

    const upVote = new Upvote();
    upVote.user = data.user;
    upVote.tip = data.tip;

    if (upVoteCheck && upVoteCheck.status === false) {
      const pushUpvote = await this.upvoteRepository.create(upVote);

      if (!pushUpvote) {
        Report.Error(
          "Error on remove upvote",
          StatusCode.InternalServerError,
          "upvote-send-usecase",
        );

        return null;
      }

      const upVoteObject = upVote.toObject();

      return Promise.resolve({
        ...upVoteObject,
        status: "add",
      });
    }

    const removeUpvote = await this.upvoteRepository.delete(upVoteCheck.id);

    if (!removeUpvote) {
      Report.Error(
        "Error on add upvote",
        StatusCode.InternalServerError,
        "upvote-send-usecase",
      );

      return null;
    }

    const upvoteObject = upVote.toObject();

    return Promise.resolve({
      ...upvoteObject,
      status: "remove",
    });
  }
}

export { UpvoteSendUseCase };
