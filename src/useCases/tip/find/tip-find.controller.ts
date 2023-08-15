import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestBody,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { TipFindUseCase } from "./tip-find.usecase";
import { ITipFindRequestDTO, ITipFindResponseDTO } from "./tip-find.dto";
import { TipRoute } from "routes/tip.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller(TipRoute.find)
class TipFindController extends BaseController {
  constructor(private tipFindUseCase: TipFindUseCase) {
    super("tip-find-controller");
  }

  @httpGet("/", authMiddleware)
  async execute(
    @response() res: Response,
    @requestBody() req: ITipFindRequestDTO,
    @requestHeaders("decoded") decoded,
  ): Promise<ITipFindResponseDTO> {
    return this.callUseCaseAsync(
      this.tipFindUseCase.execute({ ...req, user_id: decoded.id }),
      res,
      StatusCode.OK,
    );
  }
}

export { TipFindController };
