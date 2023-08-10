import { IEntity } from "@entities/base.entity";
import { Document, FilterQuery, PopulateOptions } from "mongoose";

interface IBaseRepository<T extends IEntity, U extends Document> {
  create(
    item: U,
    refEntities: (Document | Document[])[],
    embeddedRelations: string[],
    refBack: boolean,
  ): Promise<U | null>;

  update(
    item: U,
    refEntities: (Document | Document[])[],
    embeddedRelations: string[],
    refBack: boolean,
  ): Promise<U | null>;

  delete(id: string): Promise<U | null>;

  deleteReferences(
    parent: U,
    referenceField: string,
    ids: string[],
  ): Promise<U | null>;

  findOne(
    query: FilterQuery<T>,
    embeddedRelations: string[] | PopulateOptions | PopulateOptions[],
  ): Promise<U | null>;

  findById(
    id: string,
    embeddedRelations: string[] | PopulateOptions | PopulateOptions[],
  ): Promise<U | null>;

  findAll(
    query: FilterQuery<T>,
    embeddedRelations: string[] | PopulateOptions | PopulateOptions[],
  ): Promise<U[]>;
}

export { IBaseRepository };
