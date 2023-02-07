import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export interface IVoucher {
  _id?: mongoose.Schema.Types.ObjectId;

  startTime: Date;

  endTime: Date;

  quantity: number;

  discount: number;

  categories: string[];

  code: string;

  nameVoucher: string;

  description: string;

  createdAt?: Date;

  updatedAt?: Date;
}
