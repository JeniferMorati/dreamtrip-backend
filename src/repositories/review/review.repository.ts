import { ITravelReview, Review, ReviewDocument } from "@entities/review.entity";
import { TravelDestination } from "@entities/travel.entity";
import { BaseRepository } from "@repositories/base-repository";
import { provide } from "inversify-binding-decorators";
import {
  IReviewApresentation,
  IReviewRepositoryImplements,
} from "./review.repository.interface";
import { Report, StatusCode } from "@expressots/core";
import { User } from "@entities/user.entity";
import { Types } from "mongoose";

@provide(ReviewRepository)
export class ReviewRepository
  extends BaseRepository<ITravelReview, ReviewDocument>
  implements IReviewRepositoryImplements
{
  constructor() {
    super();
    this.model = Review;
  }

  calculateAverageRating(reviews: ITravelReview[]): number {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }

  async writeReview(
    travelId: string,
    userId: string,
    comment: string,
    rating: number,
  ): Promise<IReviewApresentation | null> {
    try {
      const travel = await TravelDestination.findById(travelId);
      if (!travel) {
        Report.Error(
          "Travel not found",
          StatusCode.NotFound,
          "review-repository",
        );
        return null;
      }

      const user = await User.findById(userId);

      if (!user) {
        Report.Error(
          "User not found",
          StatusCode.NotFound,
          "review-repository",
        );

        return null;
      }

      const newReview = new Review({
        user: new Types.ObjectId(userId),
        travel: new Types.ObjectId(travelId),
        comment: comment,
        rating: rating,
      });

      const review = await this.model.create(newReview);

      if (!review) {
        Report.Error(
          "Fail on send review",
          StatusCode.NotFound,
          "review-repository",
        );

        return null;
      }

      const travelTotalRating = await this.model.find({
        travel: travelId,
      });

      travel.rating = this.calculateAverageRating(travelTotalRating);

      await travel.save();

      const reviewObject = review.toObject();

      return {
        ...reviewObject,
        image: user.image || "",
        nickName: user.nickName,
        userId: user.id,
      };
    } catch (error: any) {
      Report.Error(
        "Failed to write review",
        StatusCode.InternalServerError,
        "review-repository",
      );
      return null;
    }
  }

  async deleteReview(reviewId: string) {
    try {
      const review = await this.model.findById(reviewId);

      if (!review) {
        Report.Error(
          "Review not found",
          StatusCode.NotFound,
          "review-repository",
        );
        return;
      }

      const travelId = review.travel.toString();

      await this.model.findByIdAndDelete(reviewId);

      const remainingReviews = await this.model.find({ travel: travelId });

      if (remainingReviews.length === 0) {
        const travel = await TravelDestination.findByIdAndUpdate(
          travelId,
          { rating: 0 },
          { new: true },
        );
        if (!travel) {
          Report.Error(
            "Travel not found",
            StatusCode.NotFound,
            "review-repository",
          );
          return;
        }

        return review;
      }

      const newRating = this.calculateAverageRating(remainingReviews);
      const travel = await TravelDestination.findByIdAndUpdate(
        travelId,
        { rating: newRating },
        { new: true },
      );

      if (!travel) {
        Report.Error(
          "Travel not found",
          StatusCode.NotFound,
          "review-repository",
        );
        return;
      }

      return review;
    } catch (error: any) {
      Report.Error(
        "Error deleting review and updating rating",
        StatusCode.InternalServerError,
        "review-repository",
      );
      return null;
    }
  }

  async updateReview(
    userId: string,
    reviewId: string,
    updatedComment: string,
    updatedRating: number,
  ): Promise<IReviewApresentation | null> {
    try {
      const user = await User.findById(userId);

      if (!user) {
        Report.Error(
          "User not found",
          StatusCode.NotFound,
          "review-repository",
        );
        return null;
      }

      const review = await this.model.findById(reviewId);

      if (!review) {
        Report.Error(
          "Review not found",
          StatusCode.NotFound,
          "review-repository",
        );
        return null;
      }

      if (review.user.toString() !== user._id.toString()) {
        Report.Error(
          "This comment does not belong to this user",
          StatusCode.Unauthorized,
          "review-repository",
        );
        return null;
      }

      if (updatedComment) {
        review.comment = updatedComment;
      }
      if (updatedRating) {
        review.rating = updatedRating;
      }

      const updatedReview = await review.save();

      const totalRating = await this.model.find({ travel: review.travel });
      const newRating = this.calculateAverageRating(totalRating);
      const travel = await TravelDestination.findByIdAndUpdate(
        review.travel,
        { rating: newRating },
        { new: true },
      );

      if (!travel) {
        Report.Error(
          "Travel not found",
          StatusCode.NotFound,
          "review-repository",
        );
        return null;
      }

      return updatedReview.toObject();
    } catch (error: any) {
      Report.Error(
        "Error updating review",
        StatusCode.InternalServerError,
        "review-repository",
      );
      return null;
    }
  }

  async getReviews(travelId: string): Promise<IReviewApresentation[] | null> {
    try {
      const travel = await TravelDestination.findById(travelId);
      if (!travel) {
        Report.Error(
          "Reviews not found",
          StatusCode.NotFound,
          "review-repository",
        );
        return null;
      }

      const reviewsInTravel = await this.model.find({
        travel: new Types.ObjectId(travelId),
      });

      if (!reviewsInTravel) {
        Report.Error(
          "Reviews not found",
          StatusCode.NotFound,
          "review-repository",
        );
        return null;
      }

      const reviews = await Promise.all(
        reviewsInTravel.map(async (review) => {
          const user = await User.findById(review.user);

          const objectReview = review.toObject();

          if (user) {
            return Promise.resolve({
              ...objectReview,
              image: user.image || "",
              nickName: user.nickName,
              userId: objectReview.user.toString(),
            });
          }
        }),
      );

      if (!reviews) {
        Report.Error(
          "Error on get reviews",
          StatusCode.InternalServerError,
          "review-repository",
        );

        return null;
      }

      return Promise.resolve(
        reviews.filter(
          (review) => review !== undefined,
        ) as IReviewApresentation[],
      );
    } catch (error) {
      Report.Error(
        "Reviews internal server error",
        StatusCode.InternalServerError,
        "review-repository",
      );
      return null;
    }
  }
}
