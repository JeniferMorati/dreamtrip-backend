import { IEntity } from "@entities/base.entity";
import { provide } from "inversify-binding-decorators";
import { IBaseRepository } from "./base-repository.interface";
import mongoose, { Document, Model, PopulateOptions } from "mongoose";
import { FilterQuery } from "mongoose";
import { log } from "console";
import { LogLevel } from "@expressots/core";

@provide(BaseRepository)
class BaseRepository<T extends IEntity, U extends Document>
  implements IBaseRepository<T, U>
{
  protected model!: Model<T>;
  protected connection!: mongoose.Connection; // When creating connection

  async create(
    item: U,
    refEntities: (Document | Document[])[] = [],
    embeddedRelations: string[] = [],
    refBack = false,
  ): Promise<U | null> {
    const parentRecord = await item.save();

    for (const entity of refEntities) {
      if ("collection" in entity) {
        const referenceField = entity.collection.collectionName.slice(0, -1);

        if (refBack) {
          const referenceBackfield =
            parentRecord.collection.collectionName.slice(0, -1);
          entity[referenceBackfield] = parentRecord.id;
        }

        const entityRecord = await entity.save();
        parentRecord[referenceField] = entityRecord.id;
      } else {
        for (const ref of entity) {
          if (refBack) {
            const referenceBackfield =
              parentRecord.collection.collectionName.slice(0, -1);
            ref[referenceBackfield] = parentRecord.id;
          }
          await ref.save();
        }
      }
    }

    if (refEntities.length) {
      await parentRecord.save();
    }

    if (embeddedRelations.length) {
      await parentRecord.populate(embeddedRelations);
    }
    return Promise.resolve(parentRecord);
  }

  async update(
    item: U,
    refEntities: (Document | Document[])[] = [],
    embeddedRelations: string[] = [],
  ): Promise<U | null> {
    try {
      for (const entity of refEntities) {
        if (!Array.isArray(entity)) {
          const referenceField = entity.constructor.name.slice(0, -1);
          item[referenceField] = entity.id;
          await entity.save();
        } else {
          const referenceField = entity[0].constructor.name.slice(0, -1);
          item[referenceField] = entity.map((e) => e.id);
          await Promise.all(entity.map((e) => e.save()));
        }
      }

      await item.save();

      if (embeddedRelations.length) {
        await item.populate(embeddedRelations);
      }

      return Promise.resolve(item);
    } catch (error: any) {
      log(LogLevel.Error, error, "baserepository-update");
      return Promise.resolve(null);
    }
  }

  async delete(id: string): Promise<U | null> {
    try {
      const res = await this.model.deleteOne({ _id: id });
      return Promise.resolve(res as unknown as U);
    } catch (error: any) {
      log(LogLevel.Error, error, "baserepository-delete");
      return Promise.reject(null);
    }
  }

  async deleteReferences(
    parent: U,
    referenceField: string,
    ids: string[] = [],
  ): Promise<U | null> {
    if (!parent[referenceField]) {
      return Promise.reject(null);
    }

    try {
      if (parent[referenceField] instanceof Array) {
        parent[referenceField] = parent[referenceField].filter((id) => {
          return !ids.includes(id.toString());
        });
      } else {
        if (ids.length) {
          for (const id of ids) {
            if (parent[referenceField].toString() === id) {
              parent[referenceField] = null;
              break;
            }
          }
        } else {
          parent[referenceField] = null;
        }
      }

      await parent.save();
      return Promise.resolve(parent);
    } catch (error: any) {
      log(LogLevel.Error, error, "baserepository-deletereferences");
      return Promise.reject(null);
    }
  }

  async findOne(
    query: FilterQuery<T>,
    embeddedRelations: string[] | PopulateOptions | PopulateOptions[] = [],
  ): Promise<U | null> {
    try {
      const user = await this.model
        .findOne(query)
        .populate(embeddedRelations)
        .then((userDocument) => {
          return userDocument as U;
        });
      return Promise.resolve(user);
    } catch (error: any) {
      log(LogLevel.Error, error, "baserepository-findone");
      return Promise.reject(null);
    }
  }

  async findById(
    id: string,
    embeddedRelations: string[] | PopulateOptions | PopulateOptions[] = [],
  ): Promise<U | null> {
    try {
      const res = await this.model
        .findById(id)
        .populate(embeddedRelations)
        .then((userDocument) => {
          return userDocument as U;
        });
      return Promise.resolve(res);
    } catch (error: any) {
      log(LogLevel.Error, error, "baserepository-findbyid");
      return Promise.reject(null);
    }
  }

  async findAll(
    query: FilterQuery<T> = {},
    embeddedRelations: string[] | PopulateOptions | PopulateOptions[] = [],
  ): Promise<U[]> {
    try {
      const res: U[] = await this.model
        .find(query)
        .populate(embeddedRelations)
        .then((userDocuments) => {
          return userDocuments as U[];
        });
      return Promise.resolve(res);
    } catch (error: any) {
      log(LogLevel.Error, error, "baserepository-findall");
      return Promise.reject([]);
    }
  }
}

export { BaseRepository };
