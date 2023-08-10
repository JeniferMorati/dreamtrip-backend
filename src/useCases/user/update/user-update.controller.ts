import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPatch,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import {
  IUserUpdateRequestDTO,
  IUserUpdateResponseDTO,
} from "./user-update.dto";
import { UserUpdateUseCase } from "./user-update.usecase";

@controller("/user/update")
class UserUpdateController extends BaseController {
  constructor(private userUpdateUseCase: UserUpdateUseCase) {
    super("user-update-controller");
  }

  @httpPatch("/:id")
  execute(
    @requestParam("id") id: string,
    @requestBody() payload: IUserUpdateRequestDTO,
    @response() res: Response,
  ): Promise<IUserUpdateResponseDTO> {
    const data = { ...payload, id };

    return this.callUseCaseAsync(
      this.userUpdateUseCase.execute(data),
      res,
      StatusCode.OK,
    );
  }
}

export { UserUpdateController };
