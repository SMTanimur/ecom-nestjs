import mongoose from 'mongoose';
import { USERS_ROLE_ENUM } from './users.constant';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { STATUS_ENUM } from '../shared/constants';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

const Schema = mongoose.Schema;
const UsersModelName = 'Users';

const UsersSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, require: true },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    role: {
      type: String,
      enum: USERS_ROLE_ENUM,
      default: USERS_ROLE_ENUM.USER,
    },
    status: {
      type: String,
      enum: STATUS_ENUM,
      default: STATUS_ENUM.INACTIVE,
    },
  },
  { timestamps: true },
);

UsersSchema.plugin(mongoosePaginate);
UsersSchema.plugin(mongooseAggregatePaginate);

export { UsersSchema, UsersModelName };
