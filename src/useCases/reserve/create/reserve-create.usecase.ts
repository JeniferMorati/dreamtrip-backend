import { provide } from "inversify-binding-decorators";

@provide(ReserveCreateUseCase)
class ReserveCreateUseCase {
  constructor() {}

  execute(): string {
    return "your use case";
  }
}

export { ReserveCreateUseCase };
