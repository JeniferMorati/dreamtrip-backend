import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPost,
  requestBody,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { ReviewCreateUseCase } from "./review-create.usecase";
import {
  IReviewCreateRequestDTO,
  IReviewCreateResponseDTO,
} from "./review-create.dto";
import { ReviewRoute } from "routes/review.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

@controller(ReviewRoute.create)
class ReviewCreateController extends BaseController {
  constructor(private reviewCreateUseCase: ReviewCreateUseCase) {
    super("review-create-controller");
  }

  @httpPost("/", authMiddleware)
  async execute(
    @response() res: Response,
    @requestHeaders("decoded") decoded,
    @requestBody() req: IReviewCreateRequestDTO,
  ): Promise<IReviewCreateResponseDTO> {
    return this.callUseCaseAsync(
      this.reviewCreateUseCase.execute({
        ...req,
        userId: decoded.id,
      }),
      res,
      StatusCode.OK,
    );
  }
}

export { ReviewCreateController };
