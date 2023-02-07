import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { SORT_ENUM } from './database.contant';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

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

  async findWithOptions(
    entityFilterQuery: FilterQuery<T>,
    skip = 0,
    limit = 0,
    sortBy?: string,
    options: SORT_ENUM = SORT_ENUM.ASC,
  ): Promise<T[] | null> {
    const sortObj = {};
    sortObj[sortBy] = 1;
    if (options === SORT_ENUM.DEST) {
      sortObj[sortBy] = -1;
    }
    return this.entityModel
      .find(entityFilterQuery)
      .skip(skip)
      .limit(limit)
      .sort(sortObj);
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

  // update
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

  // tu tao
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
}
