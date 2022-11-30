import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriesDto {
  @IsString()
  @IsNotEmpty()
  readonly categoryName: string;
  readonly subCategories: string[];
}
