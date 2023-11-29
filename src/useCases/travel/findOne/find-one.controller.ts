import { BaseController, StatusCode } from "@expressots/core";
import { Response } from "express";
import { TravelFindOneUseCase } from "./find-one.usecase";
import {
  controller,
  httpGet,
  queryParam,
  requestHeaders,
  response,
} from "inversify-express-utils";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";
import { TravelRoute } from "routes/travel.routes";
import { ITravelFindResponseApiDTO } from "../find/travel-find.dto";

@controller(TravelRoute.findOne)
export class TravelFindOneController extends BaseController {
  constructor(private findOneUseCase: TravelFindOneUseCase) {
    super("travel-findone-controller");
  }

  @httpGet("/", authMiddleware)
  async execute(
    @response() res: Response,
    @queryParam("id") id: string,
    @requestHeaders("decoded") decoded,
  ): Promise<ITravelFindResponseApiDTO> {
    return this.callUseCaseAsync(
      this.findOneUseCase.execute({
        id: id,
        user_id: decoded.id,
      }),
      res,
      StatusCode.OK,
    );
  }
}
