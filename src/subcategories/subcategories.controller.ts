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
import { CreateSubcategoriesDto, UpdateSubcategoriesDto } from './dto';
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

  @Get(':id')
  async getSubcategorieByID(@Param('id') id: string) {
    return this.subcategoriesService.getSubcategorieByID(id);
  }

  @Put(':id')
  async updateSubcategorie(
    @Param('id') id: string,
    @Body() subcategoryDto: UpdateSubcategoriesDto,
  ) {
    return this.subcategoriesService.updateSubcategorie(id, subcategoryDto);
  }

  @Delete(':id')
  async deleteSubcategorie(@Param('id') id: string) {
    return this.subcategoriesService.deleteSubcategorie(id);
  }
}
