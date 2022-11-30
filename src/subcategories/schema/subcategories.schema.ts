import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Products } from 'src/products/schema/products.schema';

export type SubcategoriesDocument = HydratedDocument<Subcategories>;

@Schema()
export class Subcategories {
  @Prop()
  subCategoryName: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }] })
  products: Products[];
}

export const SubcategoriesSchema = SchemaFactory.createForClass(Subcategories);
