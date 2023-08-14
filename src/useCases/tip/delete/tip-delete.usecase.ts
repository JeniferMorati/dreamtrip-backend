import { TipRepository } from "@repositories/tip/tip.repository";
import { provide } from "inversify-binding-decorators";
import { ITipDeleteResponseDTO } from "./tip-delete.dto";
import { Report, StatusCode } from "@expressots/core";
import { Tip } from "@entities/tip.entity";

@provide(TipDeleteUseCase)
class TipDeleteUseCase {
  constructor(private tipRepository: TipRepository) {}

  async execute(id: string): Promise<ITipDeleteResponseDTO | null> {
    const tipExist = await this.tipRepository.delete(id);

    if (!tipExist) {
      Report.Error("Tip not found", StatusCode.NotFound, "tip-delete-usecase");
      return null;
    }

    const tip = new Tip(tipExist);

    const removedTip = await this.tipRepository.delete(tip.id);

    if (!removedTip) {
      Report.Error(
        "Tip not deleted",
        StatusCode.InternalServerError,
        "tip-delete-usecase",
      );
      return null;
    }

    return Promise.resolve(tip);
  }
}

export { TipDeleteUseCase };
