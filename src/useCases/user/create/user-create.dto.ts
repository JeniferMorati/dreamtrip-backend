interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface ICreateUserReturnDTO {
  id: string;
  email: string;
  status: string;
}

export { ICreateUserDTO, ICreateUserReturnDTO };
