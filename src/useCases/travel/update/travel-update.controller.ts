import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestBody,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { TravelUpdateUseCase } from "./travel-update.usecase";
import {
  ITravelUpdateRequestDTO,
  ITravelUpdateResponseDTO,
} from "./travel-update.dto";

@controller("/travel/update")
class TravelUpdateController extends BaseController {
  constructor(private travelUpdateUseCase: TravelUpdateUseCase) {
    super("travel-update-controller");
  }

  @httpGet("/")
  execute(
    @response() res: Response,
    @requestBody() payload: ITravelUpdateRequestDTO,
  ): ITravelUpdateResponseDTO {
    return this.callUseCase(
      this.travelUpdateUseCase.execute(payload),
      res,
      StatusCode.OK,
    );
  }
}

export { TravelUpdateController };
