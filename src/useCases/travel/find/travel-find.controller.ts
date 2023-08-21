import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestBody,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { TravelFindUseCase } from "./travel-find.usecase";
import {
  ITravelFindRequestDTO,
  ITravelFindResponseDTO,
} from "./travel-find.dto";
import { TravelRoute } from "routes/travel.routes";
import { JWTProvider } from "@providers/hashGenerator/jwt/jwt.provider";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller(TravelRoute.find)
class TravelFindController extends BaseController {
  constructor(
    private travelFindUseCase: TravelFindUseCase,
    private jwtProvider: JWTProvider,
  ) {
    super("travel-find-controller");
  }

  @httpGet("/", authMiddleware)
  async execute(
    @response() res: Response,
    @requestBody() req: ITravelFindRequestDTO,
    @requestHeaders("decoded") decoded,
  ): Promise<ITravelFindResponseDTO> {
    return this.callUseCaseAsync(
      this.travelFindUseCase.execute({
        search: req.search,
        user_id: decoded.id,
      }),
      res,
      StatusCode.OK,
    );
  }
}

export { TravelFindController };
