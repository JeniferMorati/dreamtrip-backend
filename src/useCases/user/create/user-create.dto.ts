interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  password: string;
  birthday: Date;
}

interface ICreateUserReturnDTO {
  id: string;
  email: string;
  status: string;
}

export { ICreateUserDTO, ICreateUserReturnDTO };
