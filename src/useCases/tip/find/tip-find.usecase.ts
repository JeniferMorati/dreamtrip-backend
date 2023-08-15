import { TipRepository } from "@repositories/tip/tip.repository";
import { provide } from "inversify-binding-decorators";
import { ITipFindRequestDTO, ITipFindResponseDTO } from "./tip-find.dto";
import { Report, StatusCode } from "@expressots/core";
import { Tip } from "@entities/tip.entity";
import { UpvoteRepository } from "@repositories/upvote/upvote.repository";

@provide(TipFindUseCase)
class TipFindUseCase {
  constructor(
    private tipRepository: TipRepository,
    private upvoteRepository: UpvoteRepository,
  ) {}

  async execute(data: ITipFindRequestDTO): Promise<ITipFindResponseDTO | null> {
    const tipExist = await this.tipRepository.findById(data.id);
    let hasUpvoted = false;

    if (!tipExist) {
      Report.Error("Tip not found", StatusCode.NotFound, "tip-find-usecase");
      return null;
    }

    if (data.user_id) {
      const checkUpvoted = await this.upvoteRepository.userUpvoteCheck({
        tipId: tipExist.id,
        userId: data.user_id,
      });

      hasUpvoted = !!checkUpvoted;
    }

    const tip = new Tip(tipExist);

    const upvotes = await this.upvoteRepository.getCounterOfUpvotes(tip.id);
    tip.upVotes = upvotes || 0;

    return Promise.resolve({ ...tip, hasUpvoted });
  }
}

export { TipFindUseCase };
