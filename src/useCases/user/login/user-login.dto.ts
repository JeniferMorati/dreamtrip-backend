interface IUserLoginDTO {
  email: string;
  password: string;
}

interface IUserLoginResponseDTO {
  name: string;
  email: string;
  token: string;
  status: string;
  id: string;
}

export { IUserLoginDTO, IUserLoginResponseDTO };
