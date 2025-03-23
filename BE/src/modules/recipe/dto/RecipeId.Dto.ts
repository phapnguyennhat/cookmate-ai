import { IsNotEmpty, IsString } from "class-validator";

export class RecipeIdDto {
  @IsNotEmpty()
  @IsString()
  recipeId: string
}

export class UserRecipe extends RecipeIdDto {
  userId: string
}