import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpDelete,
  requestParam,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import {
  IUserDeleteRequestDTO,
  IUserDeleteResponseDTO,
} from "./user-delete.dto";
import { UserDeleteUseCase } from "./user-delete.usecase";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";
import { UserRoute } from "routes/user.routes";

@controller(UserRoute.delete, authMiddleware)
class UserDeleteController extends BaseController {
  constructor(private userDeleteUseCase: UserDeleteUseCase) {
    super("user-delete-controller");
  }

  @httpDelete("/")
  execute(
    @requestParam() payload: IUserDeleteRequestDTO,
    @response() res: Response,
  ): Promise<IUserDeleteResponseDTO> {
    return this.callUseCaseAsync(
      this.userDeleteUseCase.execute(payload),
      res,
      StatusCode.OK,
    );
  }
}

export { UserDeleteController };
