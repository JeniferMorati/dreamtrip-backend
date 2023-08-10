interface IUserUpdateRequestDTO {
  id: string;
  name?: string;
  email?: string;
}

interface IUserUpdateResponseDTO {
  id: string;
  name: string;
  email: string;
}

export { IUserUpdateRequestDTO, IUserUpdateResponseDTO };
