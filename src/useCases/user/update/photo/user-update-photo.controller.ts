import { BaseController, StatusCode } from "@expressots/core";
import {
  controller,
  httpPatch,
  request,
  requestBody,
  requestHeaders,
  response,
} from "inversify-express-utils";
import { Response } from "express";
import { UserUpdatePhotoUseCase } from "./user-update-photo.usecase";
import {
  IUserUpdatePhotoRequestDTO,
  IUserUpdatePhotoResponseDTO,
} from "./user-update-photo.dto";
import { UserRoute } from "routes/user.routes";
import authMiddleware from "@providers/middlewares/AuthMiddleware/authmiddleware.provider";
import multer from "multer";

// Create a storage configuration for multer
const storage = multer.memoryStorage(); // Store files in memory as buffers

// Create the multer middleware with the storage configuration
const upload = multer({ storage });

@controller(UserRoute.updatePhoto)
class UserUpdatePhotoController extends BaseController {
  constructor(private userUpdatePhotoUseCase: UserUpdatePhotoUseCase) {
    super("user-update-photo-controller");
  }

  @httpPatch("/", upload.single("image"), authMiddleware)
  async execute(
    @requestBody() payload: IUserUpdatePhotoRequestDTO,
    @response() res: Response,
    @request() req,
    @requestHeaders("decoded") decoded,
  ): Promise<IUserUpdatePhotoResponseDTO> {
    if (req.file) {
      const uploadedImageBuffer = req.file.buffer;
      payload.image = uploadedImageBuffer;
    }

    const data = { ...payload };

    return this.callUseCaseAsync(
      this.userUpdatePhotoUseCase.execute(data, decoded.id),
      res,
      StatusCode.OK,
    );
  }
}

export { UserUpdatePhotoController };
