import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Subcategories } from 'src/subcategories/schema/subcategories.schema';

export type ProductsDocument = HydratedDocument<Products>;

@Schema({ versionKey: false })
export class Products {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategories' })
  subCategoryId: Subcategories;

  @Prop()
  model: string;

  @Prop()
  product_name: string;

  @Prop()
  color: string;

  @Prop()
  price: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
