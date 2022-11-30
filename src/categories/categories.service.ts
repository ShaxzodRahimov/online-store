import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoriesDto } from './dto/categories.dto';
import { Categories, CategoriesDocument } from './schema/categories.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private categoriesModel: Model<CategoriesDocument>,
  ) {}

  async createCategory(category: CreateCategoriesDto): Promise<Categories> {
    const createdCategory = new this.categoriesModel(category);
    const isExists = await this.categoriesModel.findOne({
      categoryName: createdCategory.categoryName,
    });

    if (isExists)
      throw new HttpException('Category existed', HttpStatus.BAD_REQUEST);

    return createdCategory.save();
  }

  async getAllCategories(): Promise<Categories[]> {
    return this.categoriesModel.find({}).populate('subCategories');
  }

  async getCategoryByID(id: string): Promise<Categories> {
    const category = await this.categoriesModel
      .findById(id)
      .populate('subCategories');

    if (!category)
      throw new HttpException('Category Not Foun', HttpStatus.NOT_FOUND);

    return category;
  }
}
