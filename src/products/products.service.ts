import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductsDto } from './dto/create-product.dto';
import { Products, ProductsDocument } from './schema/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<ProductsDocument>,
  ) {}

  async createProduct(product: CreateProductsDto): Promise<Products> {
    const createdProduct = new this.productsModel(product);
    const isExists = await this.productsModel.findOne({
      product_name: createdProduct.product_name,
    });

    if (isExists)
      throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST);

    return createdProduct.save();
  }

  async getAllProducts() {
    // return []
    return this.productsModel.find({});
  }
}
