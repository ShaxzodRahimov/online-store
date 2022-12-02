import { IsOptional, IsString } from 'class-validator';

export class UpdateSubcategoriesDto {
  @IsString()
  @IsOptional()
  readonly subCategoryName: string;

  @IsOptional()
  readonly products: string[];
}
