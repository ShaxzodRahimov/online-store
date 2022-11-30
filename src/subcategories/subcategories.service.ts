import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubcategoriesDto } from './dto/subcategories.dto';
import {
  Subcategories,
  SubcategoriesDocument,
} from './schema/subcategories.schema';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectModel(Subcategories.name)
    private subcategoriesModel: Model<SubcategoriesDocument>,
  ) {}

  async createSubcategory(
    subcategory: CreateSubcategoriesDto,
  ): Promise<Subcategories> {
    const createdSubcategory = new this.subcategoriesModel(subcategory);

    const isExists = await this.subcategoriesModel.findOne({
      subCategoryName: createdSubcategory.subCategoryName,
    });

    if (isExists)
      throw new HttpException('Subcategory existed', HttpStatus.BAD_REQUEST);

    return createdSubcategory.save();
  }
}
