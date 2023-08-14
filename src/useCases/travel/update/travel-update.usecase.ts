import { Report, StatusCode } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import {
  ITravelUpdateRequestDTO,
  ITravelUpdateResponseDTO,
} from "./travel-update.dto";
import { CloudinaryProvider } from "@providers/cloudnary/cloudinary.provider";
import { TravelRepository } from "@repositories/travel/travel.repository";
import { randomUUID } from "crypto";

@provide(TravelUpdateUseCase)
class TravelUpdateUseCase {
  constructor(
    private travelRepository: TravelRepository,
    private cloudinaryProvider: CloudinaryProvider,
  ) {}

  async execute(
    payload: ITravelUpdateRequestDTO,
  ): Promise<ITravelUpdateResponseDTO | null> {
    const travel = await this.travelRepository.findById(payload.id);

    if (!travel) {
      Report.Error(
        "User not found",
        StatusCode.BadRequest,
        "user-update-usecase",
      );

      return null;
    }

    if (payload.gallery) {
      const travelGallery = await this.cloudinaryProvider.uploadMultipleImages(
        payload.gallery,
        payload.gallery.map(() => randomUUID()),
        "destination",
      );

      travel.gallery = travelGallery?.map((photo) => photo?.url) || [];
    }

    if (payload.image) {
      const uploadTravelImage = await this.cloudinaryProvider.uploadImage(
        payload.image,
        payload.id,
        "profile",
      );

      if (uploadTravelImage) {
        travel.imageVersion = uploadTravelImage.secure_url;
        travel.image =
          this.cloudinaryProvider.removeVersionUrl(uploadTravelImage);
      }
    }

    const updateTravel = await this.travelRepository.update(travel);

    if (!updateTravel) {
      Report.Error(
        "Update user fail",
        StatusCode.InternalServerError,
        "user-update-usecase",
      );
      return null;
    }

    return Promise.resolve(travel);
  }
}

export { TravelUpdateUseCase };
