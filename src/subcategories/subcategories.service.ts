import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateSubcategoriesDto, CreateSubcategoriesDto } from './dto';
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

  async getAllSubcategories() {
    return this.subcategoriesModel
      .find({})
      .populate('products', '-subCategoryId');
  }

  async getSubcategorieByID(id: string): Promise<Subcategories> {
    const subcategory = await this.subcategoriesModel
      .findById(id)
      .populate('products', '-subCategoryId');

    if (!subcategory)
      throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);

    return subcategory;
  }

  async updateSubcategorie(
    id: string,
    subcategoryDto: UpdateSubcategoriesDto,
  ): Promise<Subcategories> {
    const subcategory = await this.subcategoriesModel
      .findByIdAndUpdate(id, subcategoryDto, { new: true })
      .populate('products', '-subCategoryId');

    if (!subcategory)
      throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);

    return subcategory;
  }

  async deleteSubcategorie(id: string): Promise<Subcategories> {
    const subcategory = await this.subcategoriesModel.findByIdAndDelete(id);

    if (!subcategory)
      throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);

    return subcategory;
  }
}
