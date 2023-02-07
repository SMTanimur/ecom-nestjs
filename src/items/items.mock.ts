import mongoose from 'mongoose';

export const mockCreateItem = {
  name: '1',
  barCode: 'AW4',
  cost: 100,
  price: 150,
  weight: 150,
  avatarImg: '1',
  detailImgs: ['1', '1'],
  descriptions: 'Sieu pham 2022',
  category: {
    id: new mongoose.Schema.Types.ObjectId('62d420ca751b0a6072c1c783'),
    name: 'Smartwatch',
  },
  quantity: 100,
  tags: ['1', '2'],
};

export const mockItem = {
  name: '1',
  barCode: 'AW4',
  cost: 100,
  price: 150,
  weight: 150,
  avatarImg: '1',
  detailImgs: ['1', '1'],
  descriptions: 'Sieu pham 2022',
  category: {
    id: new mongoose.Schema.Types.ObjectId('62d420ca751b0a6072c1c783'),
    name: 'Smartwatch',
  },
  quantity: 100,
  stocks: 100,
  sold: 0,
  tags: ['1', '2'],
  _id: '62d7d8b42327b23ab1e06f4d',
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 0,
};
