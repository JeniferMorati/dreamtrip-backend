import { provide } from "inversify-binding-decorators";
import {
  IReviewCreateRequestDTO,
  IReviewCreateResponseDTO,
} from "./review-create.dto";
import { ReviewRepository } from "@repositories/review/review.repository";
import { Report, StatusCode } from "@expressots/core";

@provide(ReviewCreateUseCase)
class ReviewCreateUseCase {
  constructor(private reviewRepository: ReviewRepository) {}

  async execute(
    data: IReviewCreateRequestDTO,
  ): Promise<IReviewCreateResponseDTO | null> {
    const sendReview = this.reviewRepository.writeReview(
      data.travelId,
      data.userId,
      data.comment,
      data.rating,
    );

    if (!sendReview) {
      Report.Error(
        "Internal server error on write review",
        StatusCode.InternalServerError,
        "review-create-usecase",
      );

      return null;
    }

    return sendReview;
  }
}

export { ReviewCreateUseCase };
