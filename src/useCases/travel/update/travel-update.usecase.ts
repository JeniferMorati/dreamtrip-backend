import { Report, StatusCode } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import {
  ITravelUpdateRequestDTO,
  ITravelUpdateResponseDTO,
} from "./travel-update.dto";
import { CloudinaryProvider } from "@providers/cloudnary/cloudinary.provider";
import { TravelRepository } from "@repositories/travel/travel.repository";
import { randomUUID } from "crypto";
import { TravelDestination } from "@entities/travel.entity";

@provide(TravelUpdateUseCase)
class TravelUpdateUseCase {
  constructor(
    private travelRepository: TravelRepository,
    private cloudinaryProvider: CloudinaryProvider,
  ) {}

  async execute(
    payload: ITravelUpdateRequestDTO,
  ): Promise<ITravelUpdateResponseDTO | null> {
    const travelExist = await this.travelRepository.findById(payload.id);

    if (!travelExist) {
      Report.Error(
        "Travel destination not found",
        StatusCode.NotFound,
        "travel-update-usecase",
      );
      return null;
    }

    const travel = new TravelDestination(travelExist);

    if (payload.name) travel.name = payload.name;
    if (payload.description) travel.description = payload.description;
    if (payload.location) travel.location = payload.location;
    if (payload.category) travel.category = payload.category;
    if (payload.included) travel.included = payload.included;
    if (payload.rating !== undefined) travel.rating = payload.rating;
    if (payload.price) travel.price = payload.price;
    if (payload.dateRange) travel.dateRange = payload.dateRange;
    if (payload.notes) travel.notes = payload.notes;
    if (payload.accommodation) travel.accommodation = payload.accommodation;
    if (payload.itinerary) travel.itinerary = payload.itinerary;

    if (payload.gallery && payload.gallery.length > 0) {
      const travelGallery = await this.cloudinaryProvider.uploadMultipleImages(
        payload.gallery,
        payload.gallery.map(() => randomUUID()),
        `destination/${travelExist.id}/gallery`,
      );

      travel.gallery = travelGallery?.map((photo) => photo?.url) || [];
    }

    if (payload.image) {
      const uploadTravelImage = await this.cloudinaryProvider.uploadImage(
        payload.image,
        "cover_photo",
        `destination/${travelExist.id}`,
      );

      if (uploadTravelImage) {
        travel.imageVersion = uploadTravelImage.secure_url;
        travel.image =
          this.cloudinaryProvider.removeVersionUrl(uploadTravelImage);
      }
    }

    const updatedTravel = await this.travelRepository.update(travel);

    if (!updatedTravel) {
      Report.Error(
        "Failed to update travel destination",
        StatusCode.InternalServerError,
        "travel-update-usecase",
      );
      return null;
    }

    return updatedTravel;
  }
}

export { TravelUpdateUseCase };
