import { IUser } from "@entities/user.entity";

type ICreateUserDTO = {
  image?: Buffer;
} & IUser;

type ICreateUserReturnDTO = {
  id: string;
  email: string;
  birthday: Date;
  firstName: string;
  lastName: string;
  nickName: string;
  image?: string;
  imageVersion?: string;
  status: string;
  interests: string[];
  token: string;
};

export { ICreateUserDTO, ICreateUserReturnDTO };
