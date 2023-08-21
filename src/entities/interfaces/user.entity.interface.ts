import { IEntity } from "@entities/base.entity";
import { AuthRole } from "@providers/roles/roles.provider";

export interface IUser extends IEntity {
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
  imageVersion?: string;
  birthday: Date;
  roles: AuthRole[];
  interests?: string[];
}
