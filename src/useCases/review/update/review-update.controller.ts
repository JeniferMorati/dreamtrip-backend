import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPatch,
  requestBody,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { ReviewUpdateUseCase } from "./review-update.usecase";
import {
  IReviewUpdateRequestDTO,
  IReviewUpdateResponseDTO,
} from "./review-update.dto";
import { ReviewRoute } from "routes/review.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller(ReviewRoute.update)
class ReviewUpdateController extends BaseController {
  constructor(private reviewUpdateUseCase: ReviewUpdateUseCase) {
    super("review-update-controller");
  }

  @httpPatch("/", authMiddleware)
  async execute(
    @response() res: Response,
    @requestBody() payload: IReviewUpdateRequestDTO,
    @requestHeaders("decoded") decoded,
  ): Promise<IReviewUpdateResponseDTO> {
    return this.callUseCaseAsync(
      this.reviewUpdateUseCase.execute({
        ...payload,
        user: decoded.id,
      }),
      res,
      StatusCode.OK,
    );
  }
}

export { ReviewUpdateController };
