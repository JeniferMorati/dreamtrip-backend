import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpGet, response } from "inversify-express-utils";
import { Response } from "express";
import { ReserveCreateUseCase } from "./reserve-create.usecase";
import { IReserveCreateResponseDTO } from "./reserve-create.dto";

@controller("/reserve/create")
class ReserveCreateController extends BaseController {
  constructor(private reserveCreateUseCase: ReserveCreateUseCase) {
    super("reserve-create-controller");
  }

  @httpGet("/")
  execute(@response() res: Response): IReserveCreateResponseDTO {
    return this.callUseCase(
      this.reserveCreateUseCase.execute(),
      res,
      StatusCode.OK,
    );
  }
}

export { ReserveCreateController };
