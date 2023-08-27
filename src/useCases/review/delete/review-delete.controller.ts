import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpDelete,
  requestBody,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { ReviewDeleteUseCase } from "./review-delete.usecase";
import {
  IReviewDeleteRequestDTO,
  IReviewDeleteResponseDTO,
} from "./review-delete.dto";
import { ReviewRoute } from "routes/review.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller(ReviewRoute.delete)
class ReviewDeleteController extends BaseController {
  constructor(private reviewDeleteUseCase: ReviewDeleteUseCase) {
    super("review-delete-controller");
  }

  @httpDelete("/", authMiddleware)
  async execute(
    @response() res: Response,
    @requestBody() payload: IReviewDeleteRequestDTO,
    @requestHeaders("decoded") decoded,
  ): Promise<IReviewDeleteResponseDTO> {
    return this.callUseCaseAsync(
      this.reviewDeleteUseCase.execute({
        reviewId: payload.reviewId,
        userId: decoded.id,
      }),
      res,
      StatusCode.OK,
    );
  }
}

export { ReviewDeleteController };
