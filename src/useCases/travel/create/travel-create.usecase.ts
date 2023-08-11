import { provide } from "inversify-binding-decorators";
import {
  ICreateTravelRequestDTO,
  ICreateTravelResponseDTO,
} from "./travel-create.dto";
import { TravelRepository } from "@repositories/travel/travel.repository";
import { Report, StatusCode } from "@expressots/core";
import { TravelDestination } from "@entities/travel.entity";
import { CloudinaryProvider } from "@providers/cloudnary/cloudinary.provider";

@provide(CreateTravelUseCase)
class CreateTravelUseCase {
  constructor(
    private travelRepository: TravelRepository,
    private cloudinaryProvider: CloudinaryProvider,
  ) {}

  async execute(
    data: ICreateTravelRequestDTO,
  ): Promise<ICreateTravelResponseDTO | null> {
    const {
      name,
      description,
      location,
      image,
      imageVersion,
      rating,
      reviews,
      price,
      availableDates,
    } = data;

    const currentDate = new Date();

    const isInvalidDate = availableDates.find(
      (dates) => currentDate > dates.endDate || currentDate < dates.startDate,
    );

    if (isInvalidDate) {
      Report.Error(
        "Invalid date",
        StatusCode.BadRequest,
        "travel-create.usecase",
      );
    }

    const travelObj = new TravelDestination({
      name,
      description,
      location,
      image,
      imageVersion,
      rating,
      reviews,
      price,
      availableDates,
    });

    if (image) {
      const travelImages = await this.cloudinaryProvider.uploadImage(
        image,
        travelObj.id,
        "destination",
      );

      travelObj.image = travelImages?.url;
      travelObj.imageVersion = travelImages?.url.replace(
        `/v${travelImages.version}/`,
        "/",
      );
    }

    const travelCreated = await this.travelRepository.create(travelObj);

    if (!travelCreated) {
      Report.Error(
        "Error to create travel",
        StatusCode.InternalServerError,
        "travel-create-usecase",
      );

      return null;
    }

    return Promise.resolve(travelCreated);
  }
}

export { CreateTravelUseCase };
