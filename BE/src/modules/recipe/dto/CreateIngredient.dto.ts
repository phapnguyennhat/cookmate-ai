import { IsNotEmpty, IsString } from "class-validator";

export class CreateIngredientDto {
  @IsNotEmpty()
  @IsString()
  ingredient: string

  @IsNotEmpty()
  @IsString()
  icon: string

  @IsNotEmpty()
  @IsString()
  quantity: string
}