import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestBody,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { TipListUseCase } from "./tip-list.usecase";
import { ITipListRequestDTO, ITipListResponseDTO } from "./tip-list.dto";
import { TipRoute } from "routes/tip.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller(TipRoute.list)
class TipListController extends BaseController {
  constructor(private tipListUseCase: TipListUseCase) {
    super("tip-list-controller");
  }

  @httpGet("/", authMiddleware)
  async execute(
    @response() res: Response,
    @requestHeaders("decoded") decoded: ITipListRequestDTO,
  ): Promise<ITipListResponseDTO> {
    return this.callUseCaseAsync(
      this.tipListUseCase.execute({ id: decoded.id }),
      res,
      StatusCode.OK,
    );
  }
}

export { TipListController };
