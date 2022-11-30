import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Subcategories } from 'src/subcategories/schema/subcategories.schema';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema({ versionKey: false })
export class Categories {
  @Prop()
  categoryName: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategories' }],
  })
  subCategories: Subcategories[];
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
