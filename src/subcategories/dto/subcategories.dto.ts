import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductsDto {
  @IsString()
  @IsNotEmpty()
  readonly subCategoryName: string;
  @IsNotEmpty()
  readonly products: string[];
}
