import { provide } from "inversify-binding-decorators";

@provide(VacationLinkedUseCase)
class VacationLinkedUseCase {
  execute(): string {
    return "your use case";
  }
}

export { VacationLinkedUseCase };
