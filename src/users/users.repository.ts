import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../base/base.repository';
import { UsersModelName } from './users.schema';
import { IUSersModel } from './users.model';
import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends BaseRepository<IUSersModel> {
  constructor(
    @InjectModel(UsersModelName)
    model: PaginateModel<IUSersModel>,
  ) {
    super(<PaginateModel<IUSersModel>>model);
  }
}
