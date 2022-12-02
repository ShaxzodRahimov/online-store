import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto, updateCategoriesDto } from './dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(@Body() category: CreateCategoriesDto) {
    return this.categoriesService.createCategory(category);
  }

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  async getCategoryByID(@Param('id') id: string) {
    return this.categoriesService.getCategoryByID(id);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryDto: updateCategoriesDto,
  ) {
    return this.categoriesService.updateCategory(id, categoryDto);
  }
}
