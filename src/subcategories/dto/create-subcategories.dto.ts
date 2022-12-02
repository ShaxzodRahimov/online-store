import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubcategoriesDto {
  @IsString()
  @IsNotEmpty()
  readonly subCategoryName: string;
  @IsNotEmpty()
  readonly products: string[];
}
