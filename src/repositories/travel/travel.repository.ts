import { Review } from "@entities/review.entity";
import {
  ITravelDestination,
  TravelDestination,
  TravelDestinationDocument,
} from "@entities/travel.entity";
import { Report, StatusCode } from "@expressots/core";
import { BaseRepository } from "@repositories/base-repository";
import { ReviewRepository } from "@repositories/review/review.repository";
import { IReviewApresentation } from "@repositories/review/review.repository.interface";
import { provide } from "inversify-binding-decorators";
import { PopulateOptions } from "mongoose";

@provide(TravelRepository)
export class TravelRepository extends BaseRepository<
  ITravelDestination,
  TravelDestinationDocument
> {
  constructor(private reviewRepository: ReviewRepository) {
    super();
    this.model = TravelDestination;
  }

  async getRecommendedTravels(
    categories: string[],
  ): Promise<ITravelDestination[] | null> {
    try {
      const query = {
        "category.label": { $in: categories },
      };

      const recommendedTravels = await this.model.find(query);

      if (recommendedTravels.length === 0) {
        Report.Error(
          "No recommendations",
          StatusCode.NoContent,
          "travel-repository",
        );
      }

      return recommendedTravels;
    } catch (error: any) {
      if (error?.statusCode === 204) {
        Report.Error(
          "No recommendations",
          StatusCode.NoContent,
          "travel-repository",
        );
      }

      Report.Error(
        "Failed to get recommended travels",
        StatusCode.InternalServerError,
        "travel-repository",
      );
      return null;
    }
  }

  async getPopularTravels(limit: number): Promise<ITravelDestination[] | null> {
    try {
      const allTravels = await this.model.find();

      const travelReviewsMap: Record<string, IReviewApresentation[]> = {};
      await Promise.all(
        allTravels.map(async (travel) => {
          const reviews = await this.reviewRepository.getReviews(travel.id);
          travelReviewsMap[travel.id] = reviews || [];
        }),
      );

      const popularTravels = allTravels.sort((a, b) => {
        if (a.rating === undefined || b.rating === undefined) return 0;
        const ratingComparison = b.rating - a.rating;
        const reviewsA = travelReviewsMap[a.id]
          ? travelReviewsMap[a.id].length
          : 0;
        const reviewsB = travelReviewsMap[b.id]
          ? travelReviewsMap[b.id].length
          : 0;
        const reviewsComparison = reviewsB - reviewsA;

        return ratingComparison !== 0 ? ratingComparison : reviewsComparison;
      });

      const limitedPopularTravels = popularTravels.slice(0, limit);

      if (limitedPopularTravels.length === 0) {
        Report.Error(
          "No popular travels found",
          StatusCode.NoContent,
          "travel-repository",
        );
      }

      return limitedPopularTravels;
    } catch (error: any) {
      Report.Error(
        "Failed to get popular travels",
        StatusCode.InternalServerError,
        "travel-repository",
      );
      return null;
    }
  }

  async findByNameOrLocation(
    searchTerm: string,
    startDate: Date,
    endDate: Date,
    embeddedRelations: string[] | PopulateOptions | PopulateOptions[] = [],
  ): Promise<ITravelDestination[] | null> {
    const invalidDate = startDate > endDate || startDate < new Date(Date.now());

    if (invalidDate) {
      Report.Error("", StatusCode.NoContent, "travel-repository");

      return null;
    }

    try {
      const searchQuery = {
        $and: [
          {
            $or: [
              { name: { $regex: searchTerm, $options: "i" } },
              { "location.city": { $regex: searchTerm, $options: "i" } },
              { "location.country": { $regex: searchTerm, $options: "i" } },
              { "location.state": { $regex: searchTerm, $options: "i" } },
            ],
          },
          {
            $or: [
              {
                "dateRange.openDate": { $lte: new Date(startDate) },
                "dateRange.closeDate": { $gte: new Date(endDate) },
              },
            ],
          },
        ],
      };

      const destinations = await this.model
        .find(searchQuery)
        .populate(embeddedRelations);

      if (destinations.length === 0) {
        Report.Error("", StatusCode.NoContent, "travel-repository");
      }

      return destinations;
    } catch (error: any) {
      console.log(error);
      if (error?.statusCode === 204) {
        Report.Error("", StatusCode.NoContent, "travel-repository");
      }

      Report.Error(
        "Find travel is not possible",
        StatusCode.InternalServerError,
        "travel-repository",
      );
      return null;
    }
  }
}
