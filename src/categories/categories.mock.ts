import { STATUS_ENUM } from './categories.constant';

export const mockCategory = {
  categoryName: '1',
  image: '1',
  status: STATUS_ENUM.ACTIVE,
  priority: Date.now(),
  _id: '62d7b6789897c8338f8b4201',
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 0,
};

export const mockCreateCategory = {
  categoryName: '1',
  image: '1',
};

export const mockUpdateCategory = {
  categoryName: '1',
  image: '1',
  status: STATUS_ENUM.ACTIVE,
  priority: Date.now(),
};
