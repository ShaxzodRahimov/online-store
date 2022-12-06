import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateProductsDto } from './dto';
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

  @Get('query')
  async getProductByQuery(@Query() data: object) {
    return this.productsService.getProductByQuery(data);
  }

  @Get(':id')
  async getProductByID(@Param('id') id: string) {
    return this.productsService.getProductByID(id);
  }

  @Get()
  async getAllProducts() {
    return []
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
