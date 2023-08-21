import { IUpvote } from "@entities/upvote.entity";

interface IUpvoteSendRequestHeadersDTO {
  id: string;
}

type IUpvoteSendRequestDTO = {
  tip_id: string;
} & IUpvoteSendRequestHeadersDTO;

type IUpvoteSendResponseDTO = IUpvote & {
  status: string;
};

export { IUpvoteSendRequestDTO, IUpvoteSendResponseDTO };
