import { ITravelReview } from "@entities/review.entity";
import { IReviewApresentation } from "@repositories/review/review.repository.interface";

type IReviewUpdateRequestDTO = ITravelReview & {
  user: string;
  travel: string;
};

type IReviewUpdateResponseDTO = IReviewApresentation;

export { IReviewUpdateRequestDTO, IReviewUpdateResponseDTO };
