import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { FavoriteListUseCase } from "./favorite-list.usecase";
import {
  IFavoriteListRequestHeaders,
  IFavoriteListResponseDTO,
} from "./favorite-list.dto";
import { FavoriteRoute } from "routes/favorites.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller(FavoriteRoute.list)
class FavoriteListController extends BaseController {
  constructor(private favoriteListUseCase: FavoriteListUseCase) {
    super("favorite-list-controller");
  }

  @httpGet("/", authMiddleware)
  async execute(
    @response() res: Response,
    @requestHeaders("decoded") decoded: IFavoriteListRequestHeaders,
  ): Promise<IFavoriteListResponseDTO> {
    return this.callUseCaseAsync(
      this.favoriteListUseCase.execute({ id: decoded.id }),
      res,
      StatusCode.OK,
    );
  }
}

export { FavoriteListController };
