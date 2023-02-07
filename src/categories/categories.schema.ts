import mongoose from 'mongoose';
import { STATUS_ENUM } from 'src/shared/constants';

import * as mongoosePaginate from 'mongoose-paginate-v2';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

const Schema = mongoose.Schema;
const categoriesModelName = 'Categories';

const CategoriesSchema = new Schema(
  {
    categoryName: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    status: { type: String, enum: STATUS_ENUM, default: STATUS_ENUM.INACTIVE },
    priority: { type: String, required: true },
  },
  { timestamps: true },
);

CategoriesSchema.plugin(mongoosePaginate);
CategoriesSchema.plugin(mongooseAggregatePaginate);

export { CategoriesSchema, categoriesModelName };
