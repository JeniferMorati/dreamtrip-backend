import { provide } from "inversify-binding-decorators";
import { ITipListRequestDTO, ITipListResponseDTO } from "./tip-list.dto";
import { TipRepository } from "@repositories/tip/tip.repository";
import { Report, StatusCode } from "@expressots/core";
import { Tip } from "@entities/tip.entity";
import { UpvoteRepository } from "@repositories/upvote/upvote.repository";
import { Types } from "mongoose";

@provide(TipListUseCase)
class TipListUseCase {
  constructor(
    private tipRepository: TipRepository,
    private upvoteRepository: UpvoteRepository,
  ) {}

  async execute(data: ITipListRequestDTO): Promise<ITipListResponseDTO | null> {
    const tipListExist = await this.tipRepository.findLatestTips();
    let hasUpvoted = false;

    if (!tipListExist) {
      Report.Error("Tips not exist", StatusCode.NotFound, "tip-list-usecase");
      return null;
    }

    const tipList = await Promise.all(
      tipListExist.map(async (tip) => {
        if (data.id) {
          const checkUpvoted = await this.upvoteRepository.userUpvoteCheck({
            tipId: tip.id,
            userId: data.id,
          });

          hasUpvoted = !!checkUpvoted.status;
        }

        const newTip = new Tip(tip);
        const upvotes = await this.upvoteRepository.getCounterOfUpvotes(tip.id);

        newTip.upVotes = upvotes || 0;

        const tipObject = newTip.toObject();

        return {
          ...tipObject,
          hasUpvoted,
        };
      }),
    );

    return Promise.resolve(tipList);
  }
}

export { TipListUseCase };
