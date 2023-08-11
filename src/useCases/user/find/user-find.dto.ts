interface IUserFindRequestDTO {
  email: string;
}

interface IUserFindResponseDTO {
  id: string;
  nickName: string;
  email: string;
}

export { IUserFindRequestDTO, IUserFindResponseDTO };
