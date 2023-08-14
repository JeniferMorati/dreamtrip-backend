import { provide } from "inversify-binding-decorators";
import { ITipListResponseDTO } from "./tip-list.dto";
import { TipRepository } from "@repositories/tip/tip.repository";
import { Report, StatusCode } from "@expressots/core";
import { Tip } from "@entities/tip.entity";

@provide(TipListUseCase)
class TipListUseCase {
  constructor(private tipRepository: TipRepository) {}

  async execute(): Promise<ITipListResponseDTO | null> {
    const tipListExist = await this.tipRepository.findLatestTips();

    if (!tipListExist) {
      Report.Error("Tips not exist", StatusCode.NotFound, "tip-list-usecase");
      return null;
    }

    const tipList = tipListExist.map((tip) => new Tip(tip));

    return Promise.resolve(tipList);
  }
}

export { TipListUseCase };
