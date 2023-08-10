interface IMongooseDTO {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export { IMongooseDTO };
