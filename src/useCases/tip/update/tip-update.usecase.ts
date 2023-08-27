import { CloudinaryProvider } from "@providers/cloudnary/cloudinary.provider";
import { TipRepository } from "@repositories/tip/tip.repository";
import { provide } from "inversify-binding-decorators";
import { ITipUpdateRequestDTO, ITipUpdateResponseDTO } from "./tip-update.dto";
import { Tip } from "@entities/tip.entity";
import { Report, StatusCode } from "@expressots/core";

@provide(TipUpdateUseCase)
class TipUpdateUseCase {
  constructor(
    private tipRepository: TipRepository,
    private cloudinaryProvider: CloudinaryProvider,
  ) {}

  async execute(
    data: ITipUpdateRequestDTO,
  ): Promise<ITipUpdateResponseDTO | null> {
    const tipExist = await this.tipRepository.findById(data.id);

    if (!tipExist) {
      Report.Error(
        "Tip doesn't exist",
        StatusCode.NotFound,
        "tip-update-usecase",
      );
      return null;
    }

    const tip = new Tip(tipExist);

    tip.content = data.content || tip.content;
    tip.subTitle = data.subTitle || tip.subTitle;
    tip.title = data.title || tip.title;

    if (data.coverPhoto) {
      const uploadCoverPhoto = await this.cloudinaryProvider.uploadImage(
        data.coverPhoto,
        tip.id,
        `tip/${tip.id}`,
      );

      if (uploadCoverPhoto) {
        tip.coverPhoto =
          this.cloudinaryProvider.removeVersionUrl(uploadCoverPhoto);
      }
    }

    const updatedTip = await this.tipRepository.update(tip);

    if (!updatedTip) {
      Report.Error(
        "Error on updating tip",
        StatusCode.InternalServerError,
        "tip-update-usecase",
      );
      return null;
    }

    return updatedTip;
  }
}

export { TipUpdateUseCase };
