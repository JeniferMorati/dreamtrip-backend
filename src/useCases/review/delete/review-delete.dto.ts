import { IReviewApresentation } from "@repositories/review/review.repository.interface";

interface IReviewDeleteRequestDTO {
  userId: string;
  reviewId: string;
}

type IReviewDeleteResponseDTO = IReviewApresentation & {
  message: string;
};

export { IReviewDeleteRequestDTO, IReviewDeleteResponseDTO };
