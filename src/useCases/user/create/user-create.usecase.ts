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

@provide(CreateUserUseCase)
class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailTrapProvider?: MailTrapProvider,
    private bcryptHashGen?: BcryptHashGenProvider,
  ) {}

  async execute(data: ICreateUserDTO): Promise<ICreateUserReturnDTO | null> {
    const { name, email, password } = data;

    // Verifying if the user already exist
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
      name,
      email,
      password,
    });

    // Encrypting password
    if (this.bcryptHashGen) {
      const passwordHash: string | void =
        await this.bcryptHashGen.generatePasswordHash(password);

      if (!passwordHash) {
        return null;
      }

      userObj.password = passwordHash;
    }

    const userCreated = await this.userRepository.create(userObj);

    if (!userCreated) {
      Report.Error(
        "Error to create user!",
        StatusCode.InternalServerError,
        "user-create-usecase",
      );

      return null;
    }

    if (this.mailTrapProvider) {
      this.mailTrapProvider.SendEmail(
        EmailType.CreateUser,
        userObj.email,
        userObj.name,
      );
    }

    // const token = await this.jwtProvider.signJWT(userObj);

    return Promise.resolve({
      id: userObj.id,
      email: userObj.email,
      status: "User created successfully!",
    });
  }
}

export { CreateUserUseCase };
