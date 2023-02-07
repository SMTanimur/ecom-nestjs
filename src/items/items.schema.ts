import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import * as mongoosePaginate from 'mongoose-paginate-v2';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type ItemDocument = Items & Document;

@Schema({ _id: false })
class Category {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;
}

const categorySchema = SchemaFactory.createForClass(Category);

@Schema({ timestamps: true })
export class Items {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  barCode: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  avatarImg: string;

  @Prop({ default: [] })
  detailImgs: string[];

  @Prop({ required: true })
  descriptions: string;

  @Prop({ required: true, type: categorySchema })
  category: Category;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: 0 })
  stocks: number;

  @Prop({ default: 0 })
  sold: number;

  @Prop({ default: [] })
  tags: string[];
}

export const ItemsSchema = SchemaFactory.createForClass(Items);
ItemsSchema.plugin(mongoosePaginate);
ItemsSchema.plugin(mongooseAggregatePaginate);

export interface IItemModel extends Document, Items {}
