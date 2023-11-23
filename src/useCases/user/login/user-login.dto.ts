interface IUserLoginDTO {
  email: string;
  password: string;
}

interface IUserLoginResponseDTO {
  id: string;
  email: string;
  birthday: Date;
  firstName: string;
  lastName: string;
  nickName: string;
  image?: string;
  imageVersion?: string;
  status: string;
  token: string;
  interests?: string[];
}

export { IUserLoginDTO, IUserLoginResponseDTO };
