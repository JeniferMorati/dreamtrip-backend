import { provide } from "inversify-binding-decorators";
import {
  IReviewDeleteRequestDTO,
  IReviewDeleteResponseDTO,
} from "./review-delete.dto";
import { ReviewRepository } from "@repositories/review/review.repository";
import { UserRepository } from "@repositories/user/user.repository";
import { Report, StatusCode } from "@expressots/core";

@provide(ReviewDeleteUseCase)
class ReviewDeleteUseCase {
  constructor(
    private reviewRepository: ReviewRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    data: IReviewDeleteRequestDTO,
  ): Promise<IReviewDeleteResponseDTO | null> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      Report.Error(
        "User not found",
        StatusCode.NotFound,
        "review-delete-usecase",
      );

      return null;
    }

    const review = await this.reviewRepository.findById(data.reviewId);
    if (!review) {
      Report.Error(
        "Review not found",
        StatusCode.NotFound,
        "review-delete-usecase",
      );

      return null;
    }

    const isAuthorizated = review.user.toString() === data.userId;

    console.log(review, data.userId);

    if (!isAuthorizated) {
      Report.Error(
        "Unauthorized action",
        StatusCode.Unauthorized,
        "review-delete-usecase",
      );

      return null;
    }

    const deleteReview = await this.reviewRepository.deleteReview(review.id);

    if (!deleteReview) {
      Report.Error(
        "Error on delete review",
        StatusCode.InternalServerError,
        "review-delete-usecase",
      );

      return null;
    }

    return Promise.resolve({
      ...deleteReview.toObject(),
      message: "Deleted successfully",
    });
  }
}

export { ReviewDeleteUseCase };
