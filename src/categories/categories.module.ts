import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubcategoriesModule } from 'src/subcategories/subcategories.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Categories, CategoriesSchema } from './schema/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categories.name, schema: CategoriesSchema },
    ]),
    // SubcategoriesModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
