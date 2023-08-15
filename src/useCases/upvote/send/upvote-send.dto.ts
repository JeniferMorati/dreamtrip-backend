import { IUpvote } from "@entities/upvote.entity";

type IUpvoteSendRequestDTO = IUpvote;

type IUpvoteSendResponseDTO = IUpvote & {
  status: string;
};

export { IUpvoteSendRequestDTO, IUpvoteSendResponseDTO };
