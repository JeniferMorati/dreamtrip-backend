interface IUserUpdatePhotoRequestDTO {
  image: Buffer;
}

interface IUserUpdatePhotoResponseDTO {
  image: string;
}

export { IUserUpdatePhotoRequestDTO, IUserUpdatePhotoResponseDTO };
