import { TipRepository } from "@repositories/tip/tip.repository";
import { provide } from "inversify-binding-decorators";
import { ITipFindRequestDTO, ITipFindResponseDTO } from "./tip-find.dto";
import { Report, StatusCode } from "@expressots/core";
import { Tip } from "@entities/tip.entity";

@provide(TipFindUseCase)
class TipFindUseCase {
  constructor(private tipRepository: TipRepository) {}

  async execute(data: ITipFindRequestDTO): Promise<ITipFindResponseDTO | null> {
    const tipExist = await this.tipRepository.findById(data.id);

    if (!tipExist) {
      Report.Error("Tip not found", StatusCode.NotFound, "tip-find-usecase");
      return null;
    }

    const tip = new Tip(tipExist);
    return Promise.resolve(tip);
  }
}

export { TipFindUseCase };
