import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductsDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly model: string;
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly product_name: string;
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly color: string;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}
