import { TipRepository } from "@repositories/tip/tip.repository";
import { provide } from "inversify-binding-decorators";
import { ITipCreateRequestDTO, ITipCreateResponseDTO } from "./tip-create.dto";
import { Tip } from "@entities/tip.entity";
import { Report, StatusCode } from "@expressots/core";
import { CloudinaryProvider } from "@providers/cloudnary/cloudinary.provider";
import { randomUUID } from "crypto";

@provide(TipCreateUseCase)
class TipCreateUseCase {
  constructor(
    private tipRepository: TipRepository,
    private cloudinaryProvider: CloudinaryProvider,
  ) {}

  async execute(
    data: ITipCreateRequestDTO,
  ): Promise<ITipCreateResponseDTO | null> {
    const tip = new Tip(data);

    if (data.coverPhoto) {
      const uploadCoverPhoto = await this.cloudinaryProvider.uploadImage(
        data.coverPhoto,
        randomUUID(),
        "tip",
      );

      if (uploadCoverPhoto) {
        tip.coverPhoto =
          this.cloudinaryProvider.removeVersionUrl(uploadCoverPhoto);
      }
    }

    const createdTip = await this.tipRepository.create(tip);

    if (!createdTip) {
      Report.Error(
        "Error on created tip",
        StatusCode.InternalServerError,
        "tip-create-usecase",
      );
      return null;
    }

    return Promise.resolve(createdTip);
  }
}

export { TipCreateUseCase };
