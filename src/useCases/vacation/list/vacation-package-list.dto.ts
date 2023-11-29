import { ITravelApresentation } from "@repositories/travel/travel.repository.interface";

interface IVacationPackageRequestDTO {
  package_id: string;
  user_id?: string;
}

type IVacationPackageResponseDTO = ITravelApresentation[];

export { IVacationPackageRequestDTO, IVacationPackageResponseDTO };
