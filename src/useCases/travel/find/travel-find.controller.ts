import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestBody,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { TravelFindUseCase } from "./travel-find.usecase";
import {
  ITravelFindRequestDTO,
  ITravelFindResponseDTO,
} from "./travel-find.dto";

@controller("/travel/find")
class TravelFindController extends BaseController {
  constructor(private travelFindUseCase: TravelFindUseCase) {
    super("travel-find-controller");
  }

  @httpGet("/")
  async execute(
    @response() res: Response,
    @requestBody() req: ITravelFindRequestDTO,
  ): Promise<ITravelFindResponseDTO> {
    return this.callUseCaseAsync(
      this.travelFindUseCase.execute(req),
      res,
      StatusCode.OK,
    );
  }
}

export { TravelFindController };
