import { forwardRef, Module } from '@nestjs/common';
import { CategorysService } from './categories.service';
import { CategorysController } from './categories.controller';
import { categoriesModelName, CategoriesSchema } from './categories.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from '../items/items.module';
import { CategoriesRepository } from './categories.repository';

const dbsSchemas = [{ name: categoriesModelName, schema: CategoriesSchema }];

@Module({
  // imports: [MongooseModule.forFeature(dbsSchemas), ItemsModule],
  imports: [
    MongooseModule.forFeature(dbsSchemas),
    forwardRef(() => ItemsModule),
  ],
  providers: [CategorysService, CategoriesRepository],
  controllers: [CategorysController],
  exports: [CategorysService, CategoriesRepository],
})
export class CategorysModule {}
