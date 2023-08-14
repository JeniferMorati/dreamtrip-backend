import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestBody,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { TipFindUseCase } from "./tip-find.usecase";
import { ITipFindRequestDTO, ITipFindResponseDTO } from "./tip-find.dto";
import { TipRoute } from "routes/tip.routes";

@controller(TipRoute.find)
class TipFindController extends BaseController {
  constructor(private tipFindUseCase: TipFindUseCase) {
    super("tip-find-controller");
  }

  @httpGet("/")
  async execute(
    @response() res: Response,
    @requestBody() req: ITipFindRequestDTO,
  ): Promise<ITipFindResponseDTO> {
    return this.callUseCaseAsync(
      this.tipFindUseCase.execute(req),
      res,
      StatusCode.OK,
    );
  }
}

export { TipFindController };
