interface IUserUpdateRequestDTO {
  id: string;
  nickName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: Buffer;
}

interface IUserUpdateResponseDTO {
  id: string;
  nickName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  image?: string;
}

export { IUserUpdateRequestDTO, IUserUpdateResponseDTO };
