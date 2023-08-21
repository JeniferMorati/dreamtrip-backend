import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestBody,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { TravelRecommendedUseCase } from "./travel-recommended.usecase";
import {
  ITravelRecommendedRequestDTO,
  ITravelRecommendedResponseDTO,
} from "./travel-recommended.dto";
import { TravelRoute } from "routes/travel.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller(TravelRoute.recommended)
class TravelRecommendedController extends BaseController {
  constructor(private travelRecommendedUseCase: TravelRecommendedUseCase) {
    super("travel-recommended-controller");
  }

  @httpGet("/", authMiddleware)
  async execute(
    @response() res: Response,
    @requestHeaders("decoded") decoded,
    @requestBody() req: ITravelRecommendedRequestDTO,
  ): Promise<ITravelRecommendedResponseDTO> {
    return this.callUseCaseAsync(
      this.travelRecommendedUseCase.execute({
        categories: req.categories,
        id: decoded.id,
      }),
      res,
      StatusCode.OK,
    );
  }
}

export { TravelRecommendedController };
