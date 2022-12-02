import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSubcategoriesDto } from './dto/subcategories.dto';
import { SubcategoriesService } from './subcategories.service';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createSubcategory(@Body() subcategory: CreateSubcategoriesDto) {
    return this.subcategoriesService.createSubcategory(subcategory);
  }

  @Get()
  async getAllSubcategories() {
    return this.subcategoriesService.getAllSubcategories();
  }
}
