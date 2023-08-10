import { provide } from "inversify-binding-decorators";
import { IMongooseDTO } from "./mongoose.provider.dto";
import mongoose from "mongoose";
import { LogLevel, log } from "@expressots/core";
import ENV from "env";

@provide(Mongoose)
class Mongoose implements IMongooseDTO {
  private connection!: mongoose.Connection;
  connectionOptions = {};
  connectionString = ENV.Application.MONGO_DB_CONNECTION;

  async connect(): Promise<void> {
    this.connection = mongoose.createConnection(
      this.connectionString,
      this.connectionOptions,
    );

    this.connection.set("strictQuery", false);
    log(LogLevel.Info, "MongoDB is connected", "mongoose-provider");
  }

  async disconnect(): Promise<void> {
    log(LogLevel.Info, "MongoDB connection closed", "mongoose-provider");
    await this.connection.close();
  }

  getConnection(): mongoose.Connection {
    return this.connection;
  }

  async defaultConnection(): Promise<void> {
    mongoose.set("strictQuery", false);

    mongoose
      .connect(this.connectionString, this.connectionOptions)
      .then(() => {
        log(LogLevel.Info, "MongoDB is connected", "mongoose-provider");
      })
      .catch((error: any) => {
        log(LogLevel.Error, error, "mongoose-provider");
      });
  }

  async defaultConnectionClose(): Promise<void> {
    if (
      mongoose.connection.readyState === mongoose.ConnectionStates.connected
    ) {
      log(LogLevel.Info, "MongoDB connection closed", "mongoose-provider");
      await mongoose.connection.close();
    }
  }
}

const mongooseProviderInstance = new Mongoose();

export { mongooseProviderInstance as MongooseProvider };
