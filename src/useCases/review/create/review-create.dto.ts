import { IReviewApresentation } from "@repositories/review/review.repository.interface";

type IReviewCreateRequestDTO = {
  travelId: string;
  userId: string;
  comment: string;
  rating: number;
};

type IReviewCreateResponseDTO = IReviewApresentation;

export { IReviewCreateRequestDTO, IReviewCreateResponseDTO };
