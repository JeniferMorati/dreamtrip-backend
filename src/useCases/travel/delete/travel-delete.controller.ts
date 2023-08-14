import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpDelete,
  requestHeaders,
  requestParam,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { TravelDeleteUseCase } from "./travel-delete.usecase";
import {
  ITravelDeleteRequestDTO,
  ITravelDeleteResponseDTO,
} from "./travel-delete.dto";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller("/travel/delete", authMiddleware)
class TravelDeleteController extends BaseController {
  constructor(private travelDeleteUseCase: TravelDeleteUseCase) {
    super("travel-delete-controller");
  }

  @httpDelete("/")
  execute(
    @response() res: Response,
    @requestParam() payload: ITravelDeleteRequestDTO,
    @requestHeaders("decoded") req,
  ): Promise<ITravelDeleteResponseDTO> {
    return this.callUseCaseAsync(
      this.travelDeleteUseCase.execute({
        id: payload.id,
        related_id: req.id,
      }),
      res,
      StatusCode.OK,
    );
  }
}

export { TravelDeleteController };
