import { AppContainer } from "@expressots/core";
import { UserModule } from "@useCases/user/user.module";
import { TravelModule } from "@useCases/travel/travel.module";

const appContainer = new AppContainer();

const container = appContainer.create([UserModule, TravelModule]);

export { container };
