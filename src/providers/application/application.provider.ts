import { Application, Environments, LogLevel, log } from "@expressots/core";
import { MongooseProvider } from "@providers/database/orm/mongoose/mongoose.provider";
import { provide } from "inversify-binding-decorators";

@provide(App)
class App extends Application {
  protected configureServices(): void {
    if (process.env.NODE_ENV !== "production") {
      Environments.checkAll();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected postServerInitialization(): void {
    MongooseProvider.defaultConnection();
  }

  protected serverShutdown(): void {
    MongooseProvider.defaultConnectionClose();
    log(LogLevel.Info, "Server is shutting down", "logger-provider");
    super.serverShutdown();
  }
}

const appInstance = new App();

export { appInstance as App };
