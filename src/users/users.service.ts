import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { Standard, STATUS_ENUM } from '../shared/constants';
import { IUsers, IUsersQuery } from './users.interface';
import { USERS_ROLE_ENUM } from './users.constant';
import { responeErrorMongoDB } from '../errors/custom_mongo_errors';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async hashPassword(passwordPlainText, saltOrRounds): Promise<string> {
    return bcrypt.hash(passwordPlainText, saltOrRounds);
  }

  async create(request: IUsers) {
    request.password = await this.hashPassword(request.password, 10);
    try {
      const userCreated = await this.userRepository.create(request);
      return userCreated;
    } catch (error) {
      responeErrorMongoDB(error);
    }
  }

  //
  async findOne(filterQuery) {
    const user = await this.userRepository.findOne(filterQuery);
    if (!user) {
      throw new NotFoundException('User not exist');
    }
    return user;
  }

  async findOneAndUpdate(id, request): Promise<IUsers> {
    return this.userRepository.findOneAndUpdate(id, request);
  }

  // [GET] /users
  async getList(query) {
    const { page, perPage, sortBy, sortType, status, role } = query;

    const options: { [k: string]: any } = {
      sort: { [sortBy]: sortType },
      limit: perPage || Standard.PER_PAGE,
      page: page || Standard.PAGE,
      select: '-password',
    };

    const andFilter: { [k: string]: any } = [];
    if (status) {
      andFilter.push({ status });
    }
    if (role) {
      andFilter.push({ role });
    }
    const filters = andFilter.length > 0 ? { $and: andFilter } : {};

    const data = await this.userRepository.paginate(filters, options);

    return data;
  }

  //[DELETE] /users/:id
  async delete(id: string) {
    try {
      const user = await this.userRepository.findOne({ _id: id });
      if (!user) {
        return { success: true };
      }
      if (user.status === STATUS_ENUM.ACTIVE) {
        throw new BadRequestException('Active user, cannot be deleted');
      }
      return { success: await this.userRepository.deleteMany({ _id: id }) };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //[PATCH] /users
  async update(request, user: IUsers, query: IUsersQuery) {
    if (user.password) {
      user.password = await this.hashPassword(user.password, 10);
    }

    let userID;
    let dataUpdate;
    if (query.userID) {
      if (request.user.userRole !== USERS_ROLE_ENUM.ADMIN) {
        throw new UnauthorizedException('Unauthorized');
      }

      userID = query.userID;
      dataUpdate = user;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { role, status, ...userUpdateData } = user;
      dataUpdate = userUpdateData;
      userID = request.user.userID;
    }

    try {
      await this.userRepository.update({ _id: userID }, dataUpdate);
      return { success: true };
    } catch (error) {
      throw new BadRequestException('The information entered is incorrect');
    }
  }
}
