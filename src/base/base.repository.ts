import { PaginateModel } from 'mongoose';
import { PaginateResult, PaginateOptions } from 'mongoose';
import { Document, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly entityModel: PaginateModel<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        ...projection,
      })
      .exec();
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntitydata: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findByIdAndUpdate(
      entityFilterQuery,
      updateEntitydata,
      { new: true },
    );
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }

  async update(
    entityFilterQuery: FilterQuery<T>,
    updateEntitydata: UpdateQuery<unknown>,
  ): Promise<unknown> {
    const updateResult = await this.entityModel.updateOne(
      entityFilterQuery,
      updateEntitydata,
    );
    return updateResult;
  }

  async updateMany(
    entityFilterQuery: FilterQuery<T>,
    updateEntitydata: UpdateQuery<unknown>,
  ): Promise<unknown> {
    const updateResult = await this.entityModel.updateMany(
      entityFilterQuery,
      updateEntitydata,
      { multi: true },
    );
    return updateResult;
  }

  async paginate(
    query: object,
    options: PaginateOptions,
  ): Promise<PaginateResult<T>> {
    return this.entityModel.paginate(query, {
      ...options,
      lean: true,
      leanWithId: false,
    });
  }
}
