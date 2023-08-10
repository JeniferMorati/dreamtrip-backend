import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { IUserLoginDTO, IUserLoginResponseDTO } from "./user-login.dto";
import { UserLoginUseCase } from "./user-login.usecase";

@controller("/user/login")
class UserLoginController extends BaseController {
  constructor(private loginUserCase: UserLoginUseCase) {
    super("login-user-controller");
  }

  @httpPost("/")
  execute(
    @requestBody() payload: IUserLoginDTO,
    @response() res: Response,
  ): Promise<IUserLoginResponseDTO> {
    return this.callUseCaseAsync(
      this.loginUserCase.execute(payload),
      res,
      StatusCode.Accepted,
    );
  }
}

export { UserLoginController };
