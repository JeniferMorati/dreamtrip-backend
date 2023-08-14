import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpDelete,
  requestBody,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { TipDeleteUseCase } from "./tip-delete.usecase";
import { ITipDeleteRequestDTO, ITipDeleteResponseDTO } from "./tip-delete.dto";
import { TipRoute } from "routes/tip.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller(TipRoute.delete)
class TipDeleteController extends BaseController {
  constructor(private tipDeleteUseCase: TipDeleteUseCase) {
    super("tip-delete-controller");
  }

  @httpDelete("/", authMiddleware)
  async execute(
    @response() res: Response,
    @requestBody() req: ITipDeleteRequestDTO,
  ): Promise<ITipDeleteResponseDTO> {
    return this.callUseCaseAsync(
      this.tipDeleteUseCase.execute(req.id),
      res,
      StatusCode.OK,
    );
  }
}

export { TipDeleteController };
