interface IUserUpdateRequestDTO {
  id: string;
  nickName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: Buffer;
  interests?: string[];
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
