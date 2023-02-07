import { Document } from 'mongoose';
import { ICategory } from './categories.interface';

export interface ICategoriesModel extends Document, ICategory {}
