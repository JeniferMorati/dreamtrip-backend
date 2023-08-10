import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { ICreateUserDTO, ICreateUserReturnDTO } from "./user-create.dto";
import { CreateUserUseCase } from "./user-create.usecase";

@controller("/user/create")
class UserCreateController extends BaseController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super("create-user-controller");
  }

  @httpPost("/")
  execute(
    @requestBody() payload: ICreateUserDTO,
    @response() res: Response,
  ): Promise<ICreateUserReturnDTO> {
    return this.callUseCaseAsync(
      this.createUserUseCase.execute(payload),
      res,
      StatusCode.Created,
    );
  }
}

export { UserCreateController };
