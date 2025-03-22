import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateIngredientDto } from "./CreateIngredient.dto";

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  recipeName: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(()=>CreateIngredientDto)
  @ValidateNested({each: true })
  ingredients: CreateIngredientDto[]

  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  @ArrayMinSize(1)
  steps: string[]

  @IsNumber()
  @IsNotEmpty()
  @Type(()=>Number)
  calories: number

  
  @IsNumber()
  @IsNotEmpty()
  @Type(()=>Number)
  cookTime: number

  @IsNumber()
  @IsNotEmpty()
  @Type(()=>Number)
  serveTo: number

  @IsString()
  @IsNotEmpty()
  imagePrompt: string

}

export class CreateRecipe extends CreateRecipeDto {
  userId: string
  recipeImageUrl: string
}