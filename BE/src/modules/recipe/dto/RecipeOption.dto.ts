import { IsNotEmpty, IsString } from "class-validator"

export class RecipeOptionDto {
  @IsString()
  @IsNotEmpty()
  recipeName: string

  @IsString()
  @IsNotEmpty()
  description: string
}