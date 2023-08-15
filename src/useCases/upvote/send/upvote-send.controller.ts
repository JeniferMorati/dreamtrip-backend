import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPatch,
  requestBody,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { UpvoteSendUseCase } from "./upvote-send.usecase";
import {
  IUpvoteSendRequestDTO,
  IUpvoteSendResponseDTO,
} from "./upvote-send.dto";
import { UpvoteRoute } from "routes/upvote.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller(UpvoteRoute.send)
class UpvoteSendController extends BaseController {
  constructor(private upvoteSendUseCase: UpvoteSendUseCase) {
    super("upvote-send-controller");
  }

  @httpPatch("/", authMiddleware)
  async execute(
    @response() res: Response,
    @requestBody() payload: IUpvoteSendRequestDTO,
    @requestHeaders("decoded") decoded,
  ): Promise<IUpvoteSendResponseDTO> {
    return this.callUseCaseAsync(
      this.upvoteSendUseCase.execute({
        ...payload,
        user: decoded.id,
      }),
      res,
      StatusCode.OK,
    );
  }
}

export { UpvoteSendController };
