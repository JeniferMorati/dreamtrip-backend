import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpGet, response } from "inversify-express-utils";
import { Response } from "express";
import { TravelPopularUseCase } from "./travel-popular.usecase";
import { ITravelPopularResponseDTO } from "./travel-popular.dto";
import { TravelRoute } from "routes/travel.routes";

@controller(TravelRoute.popular)
class TravelPopularController extends BaseController {
  constructor(private travelPopularUseCase: TravelPopularUseCase) {
    super("travel-popular-controller");
  }

  @httpGet("/")
  async execute(@response() res: Response): Promise<ITravelPopularResponseDTO> {
    return this.callUseCaseAsync(
      this.travelPopularUseCase.execute(),
      res,
      StatusCode.OK,
    );
  }
}

export { TravelPopularController };
