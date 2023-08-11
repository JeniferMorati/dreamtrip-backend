import {
  ResourceApiResponse,
  UploadApiOptions,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";
import { provide } from "inversify-binding-decorators";
import ENV from "env";
import { Report, StatusCode } from "@expressots/core";

@provide(CloudinaryProvider)
class CloudinaryProvider {
  constructor() {
    cloudinary.config({
      cloud_name: ENV.Cloudinary.CLOUD_NAME,
      api_key: ENV.Cloudinary.API_KEY,
      api_secret: ENV.Cloudinary.API_SECRET,
    });
  }

  public async getResource(
    resourceList: string[],
  ): Promise<ResourceApiResponse["resources"][0] | null> {
    try {
      const result = await cloudinary.api.resources_by_asset_ids(resourceList);
      return result.resources[0];
    } catch (error) {
      Report.Error(
        "Error to get image in Cloudinary",
        StatusCode.BadRequest,
        "cloudinary-provider",
      );
      return null;
    }
  }
  public async uploadImage(
    imageBuffer: Buffer,
    publicId: string,
    folder?: string,
  ): Promise<UploadApiResponse | null> {
    try {
      const uploadOptions: UploadApiOptions = {
        resource_type: "image",
        folder,
        public_id: publicId,
        transformation: [
          {
            width: 500,
            height: 500,
            crop: "limit",
            quality: 80,
            fetch_format: "auto",
          },
        ],
      };

      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(uploadOptions, (error: any, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          })
          .end(imageBuffer);
      });

      if (result && result.secure_url) {
        return result;
      } else {
        Report.Error(
          "Cloudinary response is missing public_id",
          StatusCode.BadRequest,
          "cloudinary-provider",
        );
        return null;
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      Report.Error(
        "Error uploading image to Cloudinary",
        StatusCode.InternalServerError,
        "cloudinary-provider",
      );
      return null;
    }
  }
}

export { CloudinaryProvider };
