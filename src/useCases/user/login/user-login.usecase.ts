import { JWTProvider } from "@providers/hashGenerator/jwt/jwt.provider";
import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import { IUserLoginDTO, IUserLoginResponseDTO } from "./user-login.dto";
import { Report, StatusCode } from "@expressots/core";
import { BcryptHashGenProvider } from "@providers/hashGenerator/bcrypt/bcrypt-hash-gen.provider";

@provide(UserLoginUseCase)
class UserLoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private JWTProvider: JWTProvider,
    private bcryptHashGen: BcryptHashGenProvider,
  ) {}

  async execute(data: IUserLoginDTO): Promise<IUserLoginResponseDTO | null> {
    const { email, password } = data;
    const findUser = await this.userRepository.findByEmailWithPassword(email);

    if (!findUser) {
      Report.Error(
        "User not a found",
        StatusCode.Unauthorized,
        "login-user-usecase",
      );

      return null;
    }
    const validPassword = await this.bcryptHashGen?.comparePasswordHash(
      password,
      findUser.password,
    );

    if (!validPassword) {
      Report.Error(
        "Email or password are is incorrect",
        StatusCode.Unauthorized,
        "login-user-usecase",
      );

      return null;
    }

    const token = await this.JWTProvider.generateToken({
      email: findUser.email,
      name: findUser.name,
      id: findUser.id,
    });

    const response: IUserLoginResponseDTO = {
      token,
      name: findUser.name,
      email: findUser.email,
      status: "success",
      id: findUser.id,
    };

    return response;
  }
}

export { UserLoginUseCase };
