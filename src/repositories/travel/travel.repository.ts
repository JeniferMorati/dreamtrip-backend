import {
  ITravelDestination,
  TravelDestination,
  TravelDestinationDocument,
} from "@entities/travel.entity";
import { Report, StatusCode } from "@expressots/core";
import { BaseRepository } from "@repositories/base-repository";
import { provide } from "inversify-binding-decorators";
import { PopulateOptions } from "mongoose";

@provide(TravelRepository)
export class TravelRepository extends BaseRepository<
  ITravelDestination,
  TravelDestinationDocument
> {
  constructor() {
    super();
    this.model = TravelDestination;
  }

  async findByNameOrLocation(
    searchTerm: string,
    embeddedRelations: string[] | PopulateOptions | PopulateOptions[] = [],
  ): Promise<ITravelDestination[] | null> {
    try {
      const searchQuery = {
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { location: { $regex: searchTerm, $options: "i" } },
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