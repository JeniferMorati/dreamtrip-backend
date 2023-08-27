import { provide } from "inversify-binding-decorators";
import {
  IReviewUpdateRequestDTO,
  IReviewUpdateResponseDTO,
} from "./review-update.dto";
import { ReviewRepository } from "@repositories/review/review.repository";
import { Report, StatusCode } from "@expressots/core";
import { UserRepository } from "@repositories/user/user.repository";

@provide(ReviewUpdateUseCase)
class ReviewUpdateUseCase {
  constructor(
    private reviewRepository: ReviewRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    data: IReviewUpdateRequestDTO,
  ): Promise<IReviewUpdateResponseDTO | null> {
    const reviewExists = await this.reviewRepository.findById(data.id);

    if (!reviewExists) {
      Report.Error(
        "Review not exists",
        StatusCode.NotFound,
        "review-update-usecase",
      );

      return null;
    }

    const userExists = await this.userRepository.findById(data.user);

    if (!userExists) {
      Report.Error(
        "User not exists",
        StatusCode.NotFound,
        "review-update-usecase",
      );

      return null;
    }

    const authorized = reviewExists.user.toString() === userExists.id;

    if (!authorized) {
      Report.Error(
        "User is unauthorized",
        StatusCode.Unauthorized,
        "review-update-usecase",
      );

      return null;
    }

    const updatedReview = await this.reviewRepository.updateReview(
      data.user,
      data.id,
      data.comment,
      data.rating,
    );

    return Promise.resolve(updatedReview);
  }
}

export { ReviewUpdateUseCase };
