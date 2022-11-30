import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Subcategories,
  SubcategoriesSchema,
} from './schema/subcategories.schema';
import { SubcategoriesController } from './subcategories.controller';
import { SubcategoriesService } from './subcategories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subcategories.name, schema: SubcategoriesSchema },
    ]),
  ],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
})
export class SubcategoriesModule {}
