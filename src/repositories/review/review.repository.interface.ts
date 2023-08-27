import { ITravelReview } from "@entities/review.entity";

export interface IReviewApresentation {
  nickName: string;
  comment: string;
  image: string;
  rating: number;
  userId: string;
}

export interface IReviewRepositoryImplements {
  writeReview: (
    travelId: string,
    userId: string,
    comment: string,
    rating: number,
  ) => Promise<IReviewApresentation | null>;
  calculateAverageRating: (reviews: ITravelReview[]) => number;
}
