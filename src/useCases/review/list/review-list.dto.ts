import { IReviewApresentation } from "@repositories/review/review.repository.interface";

interface IReviewListRequestDTO {
  travelId: string;
}

type IReviewListResponseDTO = IReviewApresentation[];

export { IReviewListRequestDTO, IReviewListResponseDTO };
