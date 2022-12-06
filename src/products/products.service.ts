import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Subcategories,
  SubcategoriesDocument,
} from 'src/subcategories/schema/subcategories.schema';
import { UpdateProductsDto } from './dto';
import { CreateProductsDto } from './dto/create-product.dto';
import { Products, ProductsDocument } from './schema/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<ProductsDocument>, 
    @InjectModel(Subcategories.name)
    private subCategoriesModel: Model<SubcategoriesDocument>,
  ) {}

  async createProduct(product: CreateProductsDto): Promise<Products> {
    const createdProduct = new this.productsModel(product);
    const isExists = await this.productsModel.findOne({
      product_name: createdProduct.product_name,
    });

    if (isExists)
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);

    const subCategoriesProduct = await this.subCategoriesModel.findById(
      createdProduct.subCategoryId,
    );

    if (!subCategoriesProduct)
      throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);

    await this.subCategoriesModel.findByIdAndUpdate(subCategoriesProduct._id, {
      products: [...subCategoriesProduct.products, createdProduct._id],
    });

    return createdProduct.save();
  }

  // async getAllProducts() {
  //   // return [];
  // return this.productsModel.find({});
  // }

  async getProductByID(id: string) {
    const product = await this.productsModel
      .findById(id)
      .populate('subCategoryId', 'subCategoryName');
    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  async getProductByQuery(data: object) {
    const product = await this.productsModel
      .find(data)
      .populate('subCategoryId', 'subCategoryName');

    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  async updateProduct(id: string, productDto: UpdateProductsDto) {
    const product = await this.productsModel.findByIdAndUpdate(id, productDto, {
      new: true,
    });

    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productsModel.findByIdAndDelete(id);

    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return product;
  }
}
