import { provide } from "inversify-binding-decorators";
import {
  IReviewListRequestDTO,
  IReviewListResponseDTO,
} from "./review-list.dto";
import { ReviewRepository } from "@repositories/review/review.repository";
import { Report, StatusCode } from "@expressots/core";

@provide(ReviewListUseCase)
class ReviewListUseCase {
  constructor(private reviewRepository: ReviewRepository) {}

  async execute(
    data: IReviewListRequestDTO,
  ): Promise<IReviewListResponseDTO | null> {
    const travelReviews = await this.reviewRepository.getReviews(data.travelId);

    if (!travelReviews) {
      Report.Error(
        "Error on list travel reviews",
        StatusCode.InternalServerError,
        "review-list-usecase",
      );

      return null;
    }

    return travelReviews;
  }
}

export { ReviewListUseCase };
