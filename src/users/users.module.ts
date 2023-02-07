import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModelName, UsersSchema } from './users.schema';
import { UsersRepository } from './users.repository';

const dbsSchemas = [{ name: UsersModelName, schema: UsersSchema }];

@Module({
  imports: [MongooseModule.forFeature(dbsSchemas)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
