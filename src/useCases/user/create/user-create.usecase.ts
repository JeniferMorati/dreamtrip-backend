import { User, UserDocument } from "@entities/user.entity";
import {
  EmailType,
  MailTrapProvider,
} from "@providers/email/mailTrap/mailtrap.provider";
import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import { ICreateUserDTO, ICreateUserReturnDTO } from "./user-create.dto";
import { BcryptHashGenProvider } from "@providers/hashGenerator/bcrypt/bcrypt-hash-gen.provider";
import { Report, StatusCode } from "@expressots/core";
import { AuthRole } from "@providers/roles/roles.provider";
import { JWTProvider } from "@providers/hashGenerator/jwt/jwt.provider";
import { CloudinaryProvider } from "@providers/cloudnary/cloudinary.provider";

@provide(CreateUserUseCase)
class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private JWTProvider: JWTProvider,
    private cloudinaryProvider: CloudinaryProvider,
    private bcryptHashGen?: BcryptHashGenProvider,
    private mailTrapProvider?: MailTrapProvider,
  ) {}

  async execute(data: ICreateUserDTO): Promise<ICreateUserReturnDTO | null> {
    const { email, password } = data;

    if (!email || !password) {
      Report.Error(
        "Password and email is required",
        StatusCode.BadRequest,
        "user-create-usecase",
      );

      return null;
    }

    const userExist: UserDocument | null = await this.userRepository.findOne({
      email,
    });

    if (userExist) {
      Report.Error(
        "User already exist",
        StatusCode.BadRequest,
        "user-create-usecase",
      );

      return null;
    }

    const userObj: UserDocument = new User({
      ...data,
    });

    if (this.bcryptHashGen) {
      const passwordHash: string | void =
        await this.bcryptHashGen.generatePasswordHash(password);

      if (!passwordHash) {
        return null;
      }

      userObj.password = passwordHash;
    }

    if (data.roles) userObj.roles = [AuthRole.User];

    userObj.image = "";
    userObj.imageVersion = "";

    const userCreated = await this.userRepository.create(userObj);

    if (!userCreated) {
      Report.Error(
        "Error to create user!",
        StatusCode.InternalServerError,
        "user-create-usecase",
      );

      return null;
    }

    if (data.image) {
      console.log(userObj);
      const uploadImage = await this.cloudinaryProvider.uploadImage(
        data.image,
        "profile_photo",
        `profile/${userObj.id}`,
      );

      if (uploadImage) {
        userObj.imageVersion = uploadImage.secure_url;
        userObj.image = this.cloudinaryProvider.removeVersionUrl(uploadImage);
      }

      const updatedImage = await this.userRepository.update(userObj);

      if (!updatedImage) {
        Report.Error(
          "User not found",
          StatusCode.NotFound,
          "user-update-photo.usecase",
        );

        return null;
      }
    }

    if (this.mailTrapProvider) {
      this.mailTrapProvider.SendEmail(
        EmailType.CreateUser,
        userObj.email,
        `${userObj.firstName} ${userObj.lastName}`,
      );
    }
    const token = await this.JWTProvider.generateToken({
      email: userObj.email,
      name: userObj.nickName,
      roles: userObj.roles,
      id: userObj.id,
    });

    return Promise.resolve({
      id: userObj.id,
      email: userObj.email,
      birthday: userObj.birthday,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      nickName: userObj.nickName,
      image: userObj?.image,
      imageVersion: userObj.imageVersion,
      status: "User created successfully!",
      token,
      interests: userObj.interests || [],
    });
  }
}

export { CreateUserUseCase };
