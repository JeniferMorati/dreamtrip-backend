import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPatch,
  requestBody,
  response,
  requestHeaders,
  request,
} from "inversify-express-utils";
import { Response } from "express";
import {
  IUserUpdateRequestDTO,
  IUserUpdateResponseDTO,
} from "./user-update.dto";
import { UserUpdateUseCase } from "./user-update.usecase";
import multer from "multer";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";

// Create a storage configuration for multer
const storage = multer.memoryStorage(); // Store files in memory as buffers

// Create the multer middleware with the storage configuration
const upload = multer({ storage });

@controller("/user/update")
class UserUpdateController extends BaseController {
  constructor(private userUpdateUseCase: UserUpdateUseCase) {
    super("user-update-controller");
  }

  @httpPatch("/", upload.single("image"), authMiddleware)
  async execute(
    @requestBody() payload: IUserUpdateRequestDTO,
    @response() res: Response,
    @request() req,
    @requestHeaders("decoded") decoded,
  ): Promise<IUserUpdateResponseDTO> {
    if (req.file) {
      const uploadedImageBuffer = req.file.buffer;
      payload.image = uploadedImageBuffer;
    }

    const data = { ...payload, id: decoded.id };

    return this.callUseCaseAsync(
      this.userUpdateUseCase.execute(data),
      res,
      StatusCode.OK,
    );
  }
}

export { UserUpdateController };
