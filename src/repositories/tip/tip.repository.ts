import { ITip, Tip, TipDocument } from "@entities/tip.entity";
import { Report, StatusCode } from "@expressots/core";
import { BaseRepository } from "@repositories/base-repository";
import { provide } from "inversify-binding-decorators";

@provide(TipRepository)
export class TipRepository extends BaseRepository<ITip, TipDocument> {
  constructor() {
    super();
    this.model = Tip;
  }

  async findLatestTips(): Promise<ITip[]> {
    try {
      const tips = await this.model
        .find()
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();

      return Promise.resolve(tips);
    } catch (error: any) {
      Report.Error(
        "Find tips is not possible",
        StatusCode.InternalServerError,
        "tip-repository",
      );
      return Promise.reject(error);
    }
  }
}
