import { STATUS_ENUM } from './categories.constant';

export interface ICategory {
  categoryName?: string;
  image?: string;
  status?: STATUS_ENUM;
  priority?: number;
}

export interface ICategoryUpdate {
  status?: STATUS_ENUM;
  priority?: number;
  categoryName?: string;
  image?: string;
}
