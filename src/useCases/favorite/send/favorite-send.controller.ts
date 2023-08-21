import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  httpPatch,
  requestBody,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { FavoriteSendUseCase } from "./favorite-send.usecase";
import {
  IFavoriteSendRequestDTO,
  IFavoriteSendRequestHeadersDTO,
  IFavoriteSendResponseDTO,
} from "./favorite-send.dto";
import { FavoriteRoute } from "routes/favorites.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller(FavoriteRoute.send)
class FavoriteSendController extends BaseController {
  constructor(private favoriteSendUseCase: FavoriteSendUseCase) {
    super("favorite-send-controller");
  }

  @httpPatch("/", authMiddleware)
  async execute(
    @response() res: Response,
    @requestBody() payload: IFavoriteSendRequestDTO,
    @requestHeaders("decoded") decoded: IFavoriteSendRequestHeadersDTO,
  ): Promise<IFavoriteSendResponseDTO> {
    return this.callUseCaseAsync(
      this.favoriteSendUseCase.execute({ ...payload, id: decoded.id }),
      res,
      StatusCode.OK,
    );
  }
}

export { FavoriteSendController };
