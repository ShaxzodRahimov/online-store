import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { UpdateProductsDto } from './dto';
import { CreateProductsDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoryService: CategoriesService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createProduct(@Body() product: CreateProductsDto) {
    return this.productsService.createProduct(product);
  }

  @Get('query')
  async getProductByQuery(@Query('') data: object) {
    if (data['categoryId'])
      return this.categoryService.getCategoryByID(data['categoryId']);
    else if (data['subCategoryId' || 'model'])
      return this.productsService.getProductByQuery(data);
    else
      throw new HttpException(
        'Normalni narsa kiritsen bumedimi',
        HttpStatus.BAD_REQUEST,
      );
  }

  @Get(':id')
  async getProductByID(@Param('id') id: string) {
    return this.productsService.getProductByID(id);
  }

  @Get()
  async getAllProducts() {
    return [];
    // return this.productsService.getAllProducts();
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: UpdateProductsDto,
  ) {
    return this.productsService.updateProduct(id, productDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
