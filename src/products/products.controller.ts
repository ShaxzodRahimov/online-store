import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductsDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createProduct(@Body() product: CreateProductsDto) {
    return this.productsService.createProduct(product);
  }

  @Get()
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }
}
