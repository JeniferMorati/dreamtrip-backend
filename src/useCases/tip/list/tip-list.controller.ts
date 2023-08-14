import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpGet, response } from "inversify-express-utils";
import { Response } from "express";
import { TipListUseCase } from "./tip-list.usecase";
import { ITipListResponseDTO } from "./tip-list.dto";
import { TipRoute } from "routes/tip.routes";

@controller(TipRoute.list)
class TipListController extends BaseController {
  constructor(private tipListUseCase: TipListUseCase) {
    super("tip-list-controller");
  }

  @httpGet("/")
  async execute(@response() res: Response): Promise<ITipListResponseDTO> {
    return this.callUseCaseAsync(
      this.tipListUseCase.execute(),
      res,
      StatusCode.OK,
    );
  }
}

export { TipListController };
