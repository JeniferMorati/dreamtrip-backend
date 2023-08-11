import { AppContainer } from "@expressots/core";
import { AppModule } from "@useCases/app/app.module";
import { UserModule } from "@useCases/user/user.module";
import { TravelModule } from "@useCases/travel/travel.module";

const appContainer = new AppContainer();

const container = appContainer.create([// Add your modules here
  AppModule, UserModule, TravelModule]);

export { container };
