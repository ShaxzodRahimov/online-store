import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from './schema/products.schema';
import {
  Subcategories,
  SubcategoriesSchema,
} from 'src/subcategories/schema/subcategories.schema';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductsSchema },
    ]),
    MongooseModule.forFeature([
      { name: Subcategories.name, schema: SubcategoriesSchema },
    ]),
    CategoriesModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
