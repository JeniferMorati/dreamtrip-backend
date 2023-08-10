interface IUserDeleteRequestDTO {
  id: string;
}

interface IUserDeleteResponseDTO {
  id: string;
  name: string;
  email: string;
  status: string;
}

export { IUserDeleteRequestDTO, IUserDeleteResponseDTO };
