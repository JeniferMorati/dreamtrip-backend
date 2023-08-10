interface IUserFindRequestDTO {
  email: string;
}

interface IUserFindResponseDTO {
  id: string;
  name: string;
  email: string;
}

export { IUserFindRequestDTO, IUserFindResponseDTO };
