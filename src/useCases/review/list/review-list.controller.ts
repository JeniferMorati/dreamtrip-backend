import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpGet,
  requestBody,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { ReviewListUseCase } from "./review-list.usecase";
import {
  IReviewListRequestDTO,
  IReviewListResponseDTO,
} from "./review-list.dto";
import { ReviewRoute } from "routes/review.routes";

@controller(ReviewRoute.list)
class ReviewListController extends BaseController {
  constructor(private reviewListUseCase: ReviewListUseCase) {
    super("review-list-controller");
  }

  @httpGet("/")
  async execute(
    @response() res: Response,
    @requestBody() req: IReviewListRequestDTO,
  ): Promise<IReviewListResponseDTO> {
    return this.callUseCaseAsync(
      this.reviewListUseCase.execute(req),
      res,
      StatusCode.OK,
    );
  }
}

export { ReviewListController };
