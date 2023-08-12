import { IUser } from "@entities/user.entity";

type ICreateUserDTO = IUser;

interface ICreateUserReturnDTO {
  id: string;
  email: string;
  status: string;
}

export { ICreateUserDTO, ICreateUserReturnDTO };
