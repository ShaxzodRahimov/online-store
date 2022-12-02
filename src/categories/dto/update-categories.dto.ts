import { IsOptional, IsString } from 'class-validator';

export class updateCategoriesDto {
  @IsString()
  @IsOptional()
  readonly categoryName: string;
  @IsOptional()
  readonly subCategories: string[];
}
